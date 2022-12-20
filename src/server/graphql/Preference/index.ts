import { builder } from '../builder';
// import prisma from "../../db/prisma";

builder.prismaNode('Preference', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (preference) => preference.id },
  fields: (t) => ({   
    key: t.exposeString('key'),
    value: t.exposeString('value'),

    apis: t.relation('apis'),
    user: t.relation('user')
  }),
});