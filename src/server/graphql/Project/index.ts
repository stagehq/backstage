import { Prisma, ProjectRole } from '@prisma/client'

import { Plan } from './../../get-project-paid-plan';
import { builder } from '../builder';
import { generateInvitationToken } from "../../invitations/token";
import { getProjectPaidPlan } from "../../get-project-paid-plan";
import { plans } from "../../stripe/plans";
import prisma from "../../db/prisma";
import { sendEmail } from "../../send-email";
import slug from "slug";
import stripe from "../../stripe";

export const PaidPlan = builder.enumType('PaidPlan', {
  values: Object.keys(plans),
});

builder.prismaNode('Project', {
  findUnique: (id) => ({ id: id }),
  id: {
    resolve: (project) => project.id,
  },
  include: {
    contributors: true
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    slug: t.exposeString('slug'),
    active: t.exposeBoolean('active'),
    labels: t.relation('labels'),
    contributors: t.relation('contributors'),
    ideas: t.relation('ideas'),
    paidPlan: t.field({
      type: PaidPlan,
      resolve: async ({ id }, _, ctx) => {
        if (!ctx.session.user.email) return null;

        // This makes sure the user has access to the project
        const project = await prisma.project.findFirst({
          where: {
            contributors: {
              some: {
                user: {
                  email: ctx.session.user.email,
                }
              },
            },
            id,
          },
        });

        return getProjectPaidPlan(project);
      },
    }),
  }),
});

builder.queryField('project', (t) =>
  t.prismaField({
    type: "Project",
    args: {
      id: t.arg.string({ required: false }),
      slug: t.arg.string({ required: false }),
    },
    resolve: async (query, root, { id, slug }, ctx) => {
      if (!ctx.session.user.email) return null;
      if ((!id && !slug) || (id && slug))
        throw new Error(
          "Please provide either an ID or a slug to the project query"
        );

      const project = await prisma.project.findFirst({
        where: {
          contributors: {
            some: {
              userMail: ctx.session.user.email,
              projectId: id as string
            },
          },
          // Note: TypeScript doesn't understand that one is for sure defined here
          id: id as string,
          slug: slug as string,
        },
      });

      if (!project) return null;

      return project;
    },
  })
);

builder.mutationField('createProject', (t) => 
  t.prismaField({
    type: "Project",
    args: {
      name: t.arg.string(),
      slug: t.arg.string({required: false}),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.name === undefined || args.name === null) return null;

      const project = await prisma.project.create({
        data: {
          name: args.name,
          slug: args.slug || slug(args.name),
        
          contributors: {
            create: [
              {
                role: "owner",
                user: {
                  connect: {
                    email: ctx.session.user.email,
                  }
                }
              },
            ]
          },
        },
      })
      return project;
    }
  })
);

builder.mutationField('updateProject', (t) =>
  t.prismaField({
    type: "Project",
    args: {
      name: t.arg.string(),
      slug: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user.email || args.name === undefined || args.name === null) return null;

      const newSlug = slug(args.name);
      
      return await prisma.project.update({
        where: { 
          slug: args.slug as string, 
        },
        data: { 
          name: args.name,
          slug: newSlug,
        }
      });
    },
  })
);

builder.mutationField('updateProjectActiveState', (t) =>
  t.prismaField({
    type: "Project",
    args: {
      active: t.arg.boolean(),
      slug: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user.email) return null;

      const projectUser = await prisma.userProjectRelation.findFirst({
        where: {
          project: {
            slug: args.slug as string,
          },
          userMail: ctx.session.user.email,
        },
      });
      if (projectUser?.role != ProjectRole.owner) return null;
      
      return await prisma.project.update({
        where: { 
          slug: args.slug as string, 
        },
        data: { 
          active: args.active || false,
        }
      });
    },
  })
);

builder.queryField('getProjectSearchResult', (t) =>
  t.prismaField({
    type: ['Project'],
    args: {
      query: t.arg.string({ required: true }),
    },
    resolve: async (_, __, { query }, ctx) => {
      if (!query || query === "") {
        throw new Error(
          "Please provide a search query"
        );
      }

      const projects = await prisma.project.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          }
        },
      });

      if (!projects) return null;

      return projects;
    },
  })
);

builder.mutationField("createStripeCheckoutBillingPortalUrl", (t) =>
  t.field({
    type: 'String',
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_, { projectId }, ctx) => {
      if (!ctx.session.user.email) return null;

      const project = await prisma.project.findFirst({
        where: {
          contributors: {
            some: {
              user: {
                email: ctx.session.user.email,
              }
            },
          },
          id: projectId,
        },
      });

      if (!project || !project.stripeCustomerId) return null;

      const { url } = await stripe.billingPortal.sessions.create({
        customer: project.stripeCustomerId,
        return_url: `${ctx.origin}/app/${project.slug}/settings`,
      });

      return url;
    },
  })
);

builder.mutationField("createStripeCheckoutSession", (t) =>
  t.field({
    type: "String",
    args: {
      plan: t.arg({
        type: PaidPlan,
        required: true,
      }),
      projectId: t.arg.string({required: true}),
    },
    resolve: async (_, { projectId, plan }, ctx) => {
      if (!ctx.session.user.email) return null;

      const priceId = plans[plan as Plan];

      if (!priceId) return null;

      const project = await prisma.project.findFirst({
        where: {
          contributors: {
            some: {
              user: {
                email: ctx.session.user.email,
              }
            },
          },
          id: projectId,
        },
      });

      if (!project) return null;

      // checkout.sessions.create can only be called with *either* a customer ID (if it exists) *or* a customer_email (if no ID exists yet)
      const customerMetadata = project.stripeCustomerId
        ? {
            customer: project.stripeCustomerId,
          }
        : {
            customer_email: ctx.session.user.email,
          };

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          projectId,
          userId: ctx.session.user.email,
        },
        allow_promotion_codes: true,
        ...customerMetadata,
        billing_address_collection: "auto",
        success_url: `${ctx.origin}/app/${project.slug}/?upgraded=true`,
        cancel_url: `${ctx.origin}/app/${project.slug}`,
      });

      return session.id;
    },
  })
);

builder.mutationField("inviteToProject", (t) => 
  t.field({
    type: "Boolean",
    args: {
      projectId: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
    },
    resolve: async (_, { projectId, email }, ctx) => {
      if (!ctx.session.user.email) return null;

      const inviter = await prisma.user.findUnique({
        where: {
          email: ctx.session.user.email,
        },
      });

      const project = await prisma.project.findFirst({
        where: {
          contributors: {
            some: {
              user: {
                email: ctx.session.user.email,
              }
            },
          },
          id: projectId,
        },
      });

      if (!project || !inviter) return null;

      const token = generateInvitationToken({
        destination: email,
        projectId,
      });

      await sendEmail({
        to: email,
        subject: `${inviter.name || inviter.email} invited you`,
        text: `Hey! Click on this link to accept your invite: ${ctx.origin}/api/invitations/accept/?token=${token}`,
      });

      return true;
    },
  })
)

builder.mutationField("removeUserFromProject", (t) => 
  t.prismaField({
    type: "Project",
    args: {
      projectId: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_, __, { projectId }, ctx) => {
      if (!ctx.session.user.email) return null;

      const hasAccess = await prisma.project.findFirst({
        where: {
          contributors: {
            some: {
              user: {
                email: ctx.session.user.email,
              }
            },
          },
          id: projectId,
        },
      });

      if (!hasAccess) return null;

      const project = await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          // contributors: {
          //   disconnect: {
          //     userMail: ctx.session.user.email
          //   },
          // },
        },
      });

      return project;
    },
  })
);