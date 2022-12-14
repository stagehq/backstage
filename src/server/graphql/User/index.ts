// import { extendType, nonNull, objectType, stringArg } from "nexus";
import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('User', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (user) => user.id },
  fields: (t) => ({
    email: t.exposeString('email'),
    alias: t.exposeString('alias'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    fullName: t.string({
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    }),
    name: t.exposeString('name'),
    image: t.exposeString('image'),
    coverImageUrl: t.exposeString('coverImageUrl'),

    sites: t.relation('sites'),
    mainSite: t.relation('mainSite'),
  }),
});

builder.queryField('currentUser', (t) =>
  t.prismaField({
    type: 'User',
    resolve: async (query, root, args, ctx) => {
      if(!ctx.session?.user.email) return null;

      return prisma.user.findUnique({
        ...query,
        where: { email: ctx.session.user.email },
      })
    }  
  }),
);

builder.queryField('getValidAlias', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      alias: t.arg.string(),
    },
    resolve: async (query, root, { alias }, ctx) => {
      if (!alias) {
        throw new Error(
          "Please provide an user alias to the user query"
        );
      }

      return prisma.user.findUnique({
        where: { alias: alias },
      })
    }
  }),
);

builder.mutationField('updateUser', (t) =>
  t.prismaField({
    type: "User",
    args: {
      alias: t.arg.string(),
      firstName: t.arg.string(),
      lastName: t.arg.string(),
      image: t.arg.string(),
      coverImageUrl: t.arg.string(),
    },
    resolve: async (query, root, { alias, firstName, lastName, image, coverImageUrl}, ctx) => {
      if (!ctx.session?.user.email) return null;

      return await prisma.user.update({
        where: { email: ctx.session?.user.email },
        data: { 
          alias, 
          firstName, 
          lastName, 
          image,
          coverImageUrl,
        }
      });
    },
  })
);
