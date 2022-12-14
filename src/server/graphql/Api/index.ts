import { builder } from '../builder';

builder.prismaNode('Api', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (api) => api.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),
    refreshToken: t.exposeString('refreshToken'),
    accessToken: t.exposeString('accessToken'),

    apiResponses: t.relation('apiResponses'),
  }),
});