import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Api', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (api) => api.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: api => api.createdAt.toString()}),
    modifiedAt: t.string({ resolve: api => api.modifiedAt.toString()}),
    accessToken: t.exposeString('accessToken'),
    isExpired: t.exposeBoolean('isExpired'),

    apiResponses: t.relation('apiResponses'),
    apiConnector: t.relation('apiConnector'),

    extension: t.relation('extension')
  }),
});

builder.mutationField('createApi', (t) => 
  t.prismaField({
    type: "Api",
    args: {
      extensionId: t.arg.string(),
      apiConnectorId: t.arg.string(),
      accessToken: t.arg.string()
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.extensionId === undefined || args.extensionId === null || args.apiConnectorId === null || args.accessToken === null || args.accessToken === undefined) return null;

      const api = await prisma.api.create({
        data: {
          apiConnector: {
            connect: {
              id: args.apiConnectorId
            }
          },
          extension: {
            connect: {
              id: args.extensionId
            }
          },
          accessToken: args.accessToken
        }
      })
      return api;
    }
  })
);