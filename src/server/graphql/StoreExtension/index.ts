import prisma from '../../db/prisma';
import { builder } from '../builder';

builder.prismaNode('StoreExtension', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (storeExtension) => storeExtension.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: storeExtension => storeExtension.createdAt.toString()}),
    modifiedAt: t.string({ resolve: storeExtension => storeExtension.modifiedAt.toString()}),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    markdown: t.exposeString('markdown'),
    icon: t.exposeString('icon'),
    
    integratedExtensions: t.relation('integratedExtensions'),
    routes: t.relation('routes'),
  }),
});

// get all store extensions
builder.queryField('getStoreExtensions', (t) =>
  t.prismaField({
    type: ['StoreExtension'],
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email) return null;

      const storeExtensions = await prisma.storeExtension.findMany();

      return storeExtensions;
    },
  })
);