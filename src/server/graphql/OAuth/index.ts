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
    user: t.relation('user'),
    apiConnector: t.relation('apiConnector')
  }),
});

builder.queryField('getOAuth', (t) =>
  t.prismaField({
    type: "OAuth",
    args: {
      apiConnectorName: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { apiConnectorName }, ctx) => {
      if (!ctx.session.user.email || !apiConnectorName) return null;

      const oAuth = await prisma.oAuth.findFirst({
        where: {
          apiConnector: {
            name: apiConnectorName
          },
          user: {
            email: ctx.session.user.email
          }
        },
      });

      return oAuth;
    },
  })
);

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

      console.log(args.apiConnectorName, ctx.session.user.email);
      //check if api extension is already added
      const check = await prisma.oAuth.findFirst({
        where: {
          apiConnector: {
            name: args.apiConnectorName
          },
          user: {
            email: ctx.session.user.email
          }
        }
      })
      console.log(check);
      if (check) {
        //update oAuth
        console.log("update");
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
        console.log("create");
        const oAuth = await prisma.oAuth.create({
          data: {
            user: {
              connect: {
                email: ctx.session.user.email
              }
            },
            apiConnector: {
              connect: {
                name: args.apiConnectorName
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