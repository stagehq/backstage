import { builder } from '../builder';

builder.prismaNode('ApiConnectorRoute', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (apiConnectorRoute) => apiConnectorRoute.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),
    
    name: t.exposeString('name'),
    url: t.exposeString('url'),
  }),
});