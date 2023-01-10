import { builder } from '../builder';

builder.prismaNode('ApiConnector', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (apiConnector) => apiConnector.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: apiConnector => apiConnector.createdAt.toString()}),
    modifiedAt: t.string({ resolve: apiConnector => apiConnector.modifiedAt.toString()}),
    
    name: t.exposeString('name'),
    markdown: t.exposeString('markdown'),
    authType: t.exposeString('authType'),
  }),
});