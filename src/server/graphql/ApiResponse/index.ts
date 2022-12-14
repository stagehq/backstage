import { builder } from '../builder';

builder.prismaNode('ApiResponse', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (apiResponses) => apiResponses.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),
    
    response: t.exposeString('response'),
  }),
});