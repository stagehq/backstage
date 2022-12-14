import { builder } from '../builder';

builder.prismaNode('Site', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (site) => site.id },
  fields: (t) => ({
    subdomain: t.exposeString('subdomain'),
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),
  }),
});