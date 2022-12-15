import { builder } from '../builder';

builder.prismaNode('Extension', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (extension) => extension.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),
    sortOrder: t.exposeInt('sortOrder'),

    storeExtension: t.relation('storeExtension'),
    underlayingApis: t.relation('underlayingApis'),
  }),
});