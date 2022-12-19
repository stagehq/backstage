import { builder } from '../builder';

builder.prismaNode('ApiConnectorRoute', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (apiConnectorRoute) => apiConnectorRoute.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: apiConnectorRoute => apiConnectorRoute.createdAt.toString()}),
    modifiedAt: t.string({ resolve: apiConnectorRoute => apiConnectorRoute.modifiedAt.toString()}),
    
    name: t.exposeString('name'),
    url: t.exposeString('url'),
  }),
});