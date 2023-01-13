import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Analytics', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (analytics) => analytics.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: analytics => analytics.createdAt.toString()}),
    modifiedAt: t.string({ resolve: analytics => analytics.modifiedAt.toString()}),

    postHogKey: t.exposeString('postHogKey'),
    hostUrl: t.exposeString('hostUrl'),
  }),
});

builder.mutationField('createAnalytics', (t) => {
  return t.prismaField({
    type: 'Analytics',
    args: {
      postHogKey: t.arg.string({ required: true }),
      hostUrl: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { postHogKey, hostUrl }, ctx) => {
      if (!ctx.session.user.email) return null;

      const analytics = await prisma.analytics.create({
        data: {
          postHogKey: postHogKey,
          hostUrl: hostUrl
        },
      });

      return analytics;
    },
  });
});