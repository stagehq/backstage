import { builder } from '../builder';

builder.prismaNode('Site', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (site) => site.id },
  fields: (t) => ({
    isMain: t.exposeBoolean('isMain'),
    subdomain: t.exposeString('subdomain')
  }),
});