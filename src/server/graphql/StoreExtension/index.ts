import { builder } from '../builder';

builder.prismaNode('StoreExtension', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (storeExtension) => storeExtension.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: storeExtension => storeExtension.createdAt.toString()}),
    modifiedAt: t.string({ resolve: storeExtension => storeExtension.modifiedAt.toString()}),
    name: t.exposeString('name'),
    markdown: t.exposeString('markdown')
  }),
});