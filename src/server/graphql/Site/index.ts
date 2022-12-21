import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Site', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (site) => site.id },
  fields: (t) => ({
    tagline: t.exposeString('tagline'),
    bio: t.exposeString('bio'),
    subdomain: t.exposeString('subdomain'),
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),

    extensions: t.relation('extensions'),
  }),
});

builder.queryField('getSite', (t) =>
  t.prismaField({
    type: "Site",
    args: {
      subdomain: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { subdomain }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.findFirst({
        where: {
          subdomain: subdomain,
        },
      });

      return site;
    },
  })
);

builder.queryField('getAllSites', (t) => {
  return t.prismaField({
    type: ['Site'],
    resolve: async (query, root, args, ctx) => {
      if(process.env.ALLOW_FETCH_ALL_SITES !== 'true') return null;

      const sites = await prisma.site.findMany();

      return sites;
    },
  });
});

builder.mutationField('upsertSite', (t) => {
  return t.prismaField({
    type: 'Site',
    args: {
      subdomain: t.arg.string({ required: true }),
      tagline: t.arg.string({ required: true }),
      bio: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { subdomain, tagline, bio }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.upsert({
        where: {
          subdomain: subdomain,
        },
        update: {
          tagline: tagline,
          bio: bio,
        },
        create: {
          user: {
            connect: {
              email: ctx.session.user.email,
            },
          },
          subdomain: subdomain,
          tagline: tagline,
          bio: bio,
        },
      });

      return site;
    },
  });
});
