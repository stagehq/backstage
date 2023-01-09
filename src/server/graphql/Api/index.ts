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