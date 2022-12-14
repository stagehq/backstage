import { builder } from '../builder';

builder.prismaNode('ApiConnector', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (apiConnector) => apiConnector.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),
    
    name: t.exposeString('name'),
    markdown: t.exposeString('markdown'),
  }),
});