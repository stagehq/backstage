import { builder } from '../builder';
// import prisma from "../../db/prisma";

builder.prismaNode('Api', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (api) => api.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: api => api.createdAt.toString()}),
    modifiedAt: t.string({ resolve: api => api.modifiedAt.toString()}),

    oAuth: t.relation('oAuth'),
    preferences: t.relation('preferences'),
    apiConnector: t.relation('apiConnector'),
    inExtensions: t.relation('inExtensions')
  }),
});