import { builder } from '../builder';

builder.prismaNode('ApiResponse', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (apiResponses) => apiResponses.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: apiResponse => apiResponse.createdAt.toString()}),
    modifiedAt: t.string({ resolve: apiResponse => apiResponse.modifiedAt.toString()}),
    
    response: t.string({ resolve: apiResponse => apiResponse.response?.toString()}),
    apiConnectorRoute: t.relation('apiConnectorRoute')
  }),
});