import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Site', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (site) => site.id },
  fields: (t) => ({
    subdomain: t.exposeString('subdomain'),
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),

    extensions: t.relation('extensions'),
  }),
});

builder.queryField('getSite', (t) =>
  t.prismaField({
    type: "Site",
    args: {
      subdomain: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { subdomain }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.findFirst({
        where: {
          subdomain: subdomain,
        },
      });

      return site;
    },
  })
);