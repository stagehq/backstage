import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Idea', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (idea) => idea.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: idea => idea.createdAt.toString()}),
    modifiedAt: t.string({ resolve: idea => idea.modifiedAt.toString()}),
    number: t.exposeInt('number'),
    title: t.exposeString('title'),
    description: t.exposeString('description'),
    reactions: t.relation('reactions'),
    comments: t.relation('comments'),
    votes: t.relation('votes'),
    voteCount: t.int({
      resolve: async (idea) => {
        const votes = await prisma.idea.findFirst({
          where: {
            id: idea.id
          }
        }).votes();
        return votes.length && votes.length > 0 ? votes.length : 0;
      }}),
    votedByUser: t.boolean({
      resolve: async (idea, _, ctx) => {
        if (!ctx.session?.user.email) return false;

        const votedByUser = await prisma.idea.findFirst({
          where: {
            id: idea.id,
            votes: {
              some: {
                email: ctx.session.user.email
              }
            }
          },
        });

        if (votedByUser !== null) {
          return true;
        } else {
          return false;
        }
      }
    }),
    creator: t.relation('creator'),
    participants: t.relation('participants'),
    // commentCount: t.int({
    //   resolve: async (idea) => {
    //     const comments = await prisma.idea.findFirst({
    //       where: {
    //         id: idea.id
    //       }
    //     }).comments();
    //     return comments.length && comments.length > 0 ? comments.length : 0;
    //   }}),
    labels: t.relation('labels'),
    project: t.relation('project')
  }),
});

builder.queryField('idea', (t) =>
  t.prismaField({
    type: 'Idea',
    args: {
      id: t.arg.string({ required: false }),
      ideaNumber: t.arg.int({ required: false }),
      projectSlug: t.arg.string({ required: false}),
    },
    resolve: (_, __, { id, ideaNumber, projectSlug }, ctx) => {
      if (!ctx.session?.user.email) return null;
      if (!((id && !ideaNumber && !projectSlug) || (!id && ideaNumber && projectSlug))){
        console.log(id, ideaNumber, projectSlug);
        throw new Error(
          "Please provide either an ID or a slug to the project query"
        );
      }
      return prisma.idea.findFirst({
        where: {
          id: id as string,
          number: ideaNumber as number,
          project: {
            slug: projectSlug as string
          }
        }
      });
    },
  }),
);

builder.mutationField('createIdea', (t) => 
  t.prismaField({
    type: "Idea",
    args: {
      title: t.arg.string(),
      description: t.arg.string(),
      projectId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.title === "" || args.title === undefined || args.title === null || args.description === "" || args.description === undefined || args.description === null || !args.projectId) return null;
      return await prisma.idea.create({
        data: {
          title: args.title,
          description: args.description,
          creator: {
            connect: {
              email: ctx.session.user.email,
            }
          },
          project: {
            connect: {
              id: args.projectId
            }
          }
          
        }
      })
    }
  })
);

builder.mutationField('updateIdea', (t) =>
  t.prismaField({
    type: "Idea",
    args: {
      id: t.arg.string(),
      description: t.arg.string({ required: false }),
      title: t.arg.string({ required: false}),
    },
    resolve: async (_, __, { id, description, title }, ctx) => {
      if (!ctx.session?.user.email || !id ) return null;
      
      // Check for examples https://www.prisma.io/docs/concepts/old/components/prisma-client/null-and-undefined
      return await prisma.idea.update({
        where: {
          id: id
        },
        data: {
          description: description != null ? description : undefined,
          title: title != null ? title : undefined,
        }
      })
    },
  })
);

builder.mutationField('updateIdeaVote', (t) =>
  t.prismaField({
    type: "Idea",
    args: {
      id: t.arg.string(),
    },
    resolve: async (_, __, { id }, ctx) => {
      if (!ctx.session?.user.email || !id) return null;

      const voted = await prisma.idea.findFirst({
        where: {
          id: id,
          votes: {
            some: {
              email: ctx.session.user.email
            }
          }
        },
      });

      return await prisma.idea.update({
        where: {
          id: id
        },
        data: {
          votes: voted !== null ? {
            disconnect: [{
              email: ctx.session.user.email
            }]
          } : {
            connect: [{
              email: ctx.session.user.email
            }]
          }
        },
        include: {
          votes: true
        }
      })
    },
  })
);

builder.queryField('getIdeaSearchResult', (t) =>
  t.prismaField({
    type: ['Idea'],
    args: {
      query: t.arg.string({ required: true }),
    },
    resolve: async (_, __, { query }, ctx) => {
      if (!query || query === "") {
        throw new Error(
          "Please provide a search query"
        );
      }

      const ideas = await prisma.idea.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          }
        },
      });

      if (!ideas) return null;

      return ideas;
    },
  })
);
