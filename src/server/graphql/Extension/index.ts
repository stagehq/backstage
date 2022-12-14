import { builder } from '../builder';

builder.prismaNode('Extension', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (extension) => extension.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),

    // storeExtension: t.relation('storeExtension'),
    // underlayingApi: t.relation('underlayingApi'),
  }),
});