import { builder } from '../builder';
// import prisma from "../../db/prisma";

builder.prismaNode('OAuth', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (oAuth) => oAuth.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: oAuth => oAuth.createdAt.toString()}),
    modifiedAt: t.string({ resolve: oAuth => oAuth.modifiedAt.toString()}),
    
    accessToken: t.exposeString('accessToken'),
    isExpired: t.exposeBoolean('isExpired'),

    expiresIn: t.exposeInt('expiresIn'),
    idToken: t.exposeString('idToken'),
    refreshToken: t.exposeString('refreshToken'),
    scope: t.exposeString('scope'),

    apis: t.relation('apis'),
    user: t.relation('user')
  }),
});