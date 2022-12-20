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
    inExtensions: t.relation('inExtensions')
  }),
});

builder.mutationField('createOAuthApi', (t) => 
  t.prismaField({
    type: "Api",
    args: {
      apiConnectorId: t.arg.string(),
      accessToken: t.arg.string(),
      expiresIn: t.arg.int({ required: false }),
      idToken: t.arg.string({ required: false }),
      refreshToken: t.arg.string({ required: false }),
      scope: t.arg.string({ required: false })
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.apiConnectorId == null || args.accessToken == null) return null;

      //check if api extension is already added
      const check = await prisma.api.findFirst({
        where: {
          user: {
            email: ctx.session.user.email
          },
          apiConnector: {
            id: args.apiConnectorId
          },
        }
      })
      if (check) return null;

      const api = await prisma.api.create({
        data: {
          user: {
            connect: {
              email: ctx.session.user.email
            }
          },
          apiConnector: {
            connect: {
              id: args.apiConnectorId
            }
          },
          oAuth: {
            create: {
              accessToken: args.accessToken,
              expiresIn: args.expiresIn,
              idToken: args.idToken,
              refreshToken: args.refreshToken,
              scope: args.scope
            }
          }
        }
      })
      return api;
    }
  })
);