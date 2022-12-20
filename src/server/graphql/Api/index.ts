import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Api', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (api) => api.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: api => api.createdAt.toString()}),
    modifiedAt: t.string({ resolve: api => api.modifiedAt.toString()}),

    oAuth: t.relation('oAuth'),
    preferences: t.relation('preferences'),
    apiConnector: t.relation('apiConnector'),
    extension: t.relation('extension'),
    apiResponses: t.relation('apiResponses')
  }),
});

builder.queryField('getApi', (t) =>
  t.prismaField({
    type: 'Api',
    args: {
      apiConnectorName: t.arg.string(),
    },
    resolve: (_, __, args, ctx) => {
      if (!ctx.session?.user.email || args.apiConnectorName == null) return null;
      const api =  prisma.api.findFirst({
        where: {
          apiConnector: {
            name: args.apiConnectorName
          },
          // user: {
          //   email: ctx.session.user.email
          // }
        }
      });

      if(!api) return null;

      return api;
    },
  }),
);

builder.mutationField('createOAuthApi', (t) => 
  t.prismaField({
    type: "Api",
    args: {
      apiConnectorName: t.arg.string(),
      accessToken: t.arg.string(),
      expiresIn: t.arg.int({ required: false }),
      idToken: t.arg.string({ required: false }),
      refreshToken: t.arg.string({ required: false }),
      scope: t.arg.string({ required: false })
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.apiConnectorName == null || args.accessToken == null) return null;

      //check if api extension is already added
      const check = await prisma.api.findFirst({
        where: {
          // user: {
          //   email: ctx.session.user.email
          // },
          apiConnector: {
            name: args.apiConnectorName
          },
        }
      })
      if (check) return null;

      // const api = await prisma.api.create({
      //   data: {
      //     apiConnector: {
      //       connect: {
      //         name: args.apiConnectorName
      //       }
      //     }
      //   }
      // })
      return check;
    }
  })
);

builder.mutationField('updateOAuthApi', (t) => 
  t.prismaField({
    type: "Api",
    args: {
      apiConnectorName: t.arg.string(),
      accessToken: t.arg.string({ required: false }),
      expiresIn: t.arg.int({ required: false }),
      idToken: t.arg.string({ required: false }),
      refreshToken: t.arg.string({ required: false }),
      scope: t.arg.string({ required: false }),
      isExpired: t.arg.boolean({ required: false })
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.apiConnectorName == null) return null;

      const api = await prisma.api.findFirst({
        where: {
          // user: {
          //   email: ctx.session.user.email
          // },
          apiConnector: {
            name: args.apiConnectorName
          }
        }
      })

      if(!api) return null

      const newApi = await prisma.api.update({
        where: {
          id: api.id
        },
        data: {
          oAuth: {
            update: {
              isExpired: args.isExpired || undefined,
              accessToken: args.accessToken || undefined,
              expiresIn: args.expiresIn || undefined,
              idToken: args.idToken || undefined,
              refreshToken: args.refreshToken || undefined,
              scope: args.scope || undefined
            }
          }
        }
      });

      return newApi;
    }
  })
);