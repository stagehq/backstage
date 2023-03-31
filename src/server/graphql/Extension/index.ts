import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Extension', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (extension) => extension.id },
  fields: (t) => ({
    title: t.exposeString('title'),
    description: t.exposeString('description'),
    createdAt: t.string({ resolve: extension => extension.createdAt.toString()}),
    modifiedAt: t.string({ resolve: extension => extension.modifiedAt.toString()}),
    sortOrder: t.exposeInt('sortOrder'),
    size: t.exposeInt('size'),

    storeExtension: t.relation('storeExtension'),
    underlayingApis: t.relation('underlayingApis'),
    site: t.relation('site')
  }),
});

builder.mutationField('updateBlockTitle', (t) => t.prismaField({
  type: 'Extension',
  args: {
    id: t.arg.string({ required: true }),
    title: t.arg.string({ required: true }),
  },
  resolve: async (query, root, { id, title }, ctx) => {
    if(!ctx.session?.user.email) return null;

    const extension = await prisma.extension.update({
      where: { id: id },
      data: { title: title },
    });
    return extension;
  },
}));

builder.mutationField('updateBlockDescription', (t) => t.prismaField({
  type: 'Extension',
  args: {
    id: t.arg.string({ required: true }),
    description: t.arg.string({ required: true }),
  },
  resolve: async (query, root, { id, description }, ctx) => {
    if(!ctx.session?.user.email) return null;

    const extension = await prisma.extension.update({
      where: { id: id },
      data: { description: description },
    });
    return extension;
  },
}));

builder.mutationField('deleteExtension', (t) => t.prismaField({
  type: 'Extension',
  args: {
    id: t.arg.string({ required: true }),
    siteId: t.arg.string({ required: true }),
  },
  resolve: async (query, root, { id, siteId }, ctx) => {
    if(!ctx.session?.user.email) return null;

    const extension = await prisma.extension.delete({
      where: { id: id },
    });

    return extension;
  }
}));