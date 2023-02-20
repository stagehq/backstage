import prisma from "../../db/prisma";
import { builder } from '../builder';

builder.prismaNode('SiteImage', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (siteImage) => siteImage.id },
  fields: (t) => ({
    siteId: t.exposeString('siteId'),
    url: t.exposeString('url'),
    alt: t.exposeString('alt'),
    createdAt: t.string({ resolve: siteImage => siteImage.createdAt.toString()}),
    modifiedAt: t.string({ resolve: siteImage => siteImage.modifiedAt.toString()}),
  }),
});

builder.mutationField('deleteSiteImage', (t) => {
  return t.prismaField({
    type: 'SiteImage',
    args: {
      id: t.arg.string({ required: true }),
      siteId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { id }, ctx) => {
      if (!ctx.session.user.email) return null;

      const siteImage = await prisma.siteImage.delete({
        where: {
          id: id,
        },
      });

      return siteImage;
    },
  });
});