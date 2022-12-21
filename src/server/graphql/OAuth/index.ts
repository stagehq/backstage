import { builder } from '../builder';
import prisma from "../../db/prisma";

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

builder.mutationField('createOAuthforApi', (t) => 
  t.prismaField({
    type: "OAuth",
    args: {
      apiConnectorName: t.arg.string(),
      accessToken: t.arg.string(),
      expiresIn: t.arg.int({ required: false }),
      idToken: t.arg.string({ required: false }),
      refreshToken: t.arg.string({ required: false }),
      scope: t.arg.string({ required: false }),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.accessToken == null || args.apiConnectorName == null) return null;

      //check if api extension is already added
      const check = await prisma.oAuth.findFirst({
        where: {
          apis: {
            some: {
              apiConnector: {
                name: args.apiConnectorName
              }
            }
          },
          user: {
            email: ctx.session.user.email
          }
        }
      })

      if (check) {
        //update oAuth
        const oAuth = await prisma.oAuth.update({
          where: {
            id: check.id
          },
          data: {
            accessToken: args.accessToken,
            expiresIn: args.expiresIn || undefined,
            idToken: args.idToken || undefined,
            refreshToken: args.refreshToken || undefined,
            scope: args.scope || undefined
          }
        })
        return oAuth;

      } else {
        //create oAuth
        const oAuth = await prisma.oAuth.create({
          data: {
            user: {
              connect: {
                email: ctx.session.user.email
              }
            },
            accessToken: args.accessToken,
            expiresIn: args.expiresIn || undefined,
            idToken: args.idToken || undefined,
            refreshToken: args.refreshToken || undefined,
            scope: args.scope || undefined
          }
        })
        return oAuth;
      }  
    }
  })
);