import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Site', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (site) => site.id },
  fields: (t) => ({
    tagline: t.exposeString('tagline'),
    bio: t.exposeString('bio'),
    subdomain: t.exposeString('subdomain'),
    layouts: t.field({ type: 'JSON', resolve: site => site.layouts}),
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
      layouts: t.arg.string({ required: false }),
    },
    resolve: async (query, root, { subdomain, tagline, bio, layouts }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.upsert({
        where: {
          subdomain: subdomain,
        },
        update: {
          tagline: tagline,
          bio: bio,
          layouts: layouts ? JSON.parse(layouts) : null,
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

builder.mutationField('updateSiteHeader', (t) => {
  return t.prismaField({
    type: 'Site',
    args: {
      subdomain: t.arg.string({ required: true }),
      tagline: t.arg.string({ required: true }),
      bio: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { subdomain, tagline, bio }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.update({
        where: {
          subdomain: subdomain,
        },
        data: {
          tagline: tagline,
          bio: bio,
        },
      });

      return site;
    },
  });
});

builder.mutationField('updateSiteLayouts', (t) => {
  return t.prismaField({
    type: 'Site',
    args: {
      id: t.arg.string({ required: true }),
      layouts: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { id, layouts }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.update({
        where: {
          subdomain: id,
        },
        data: {
          layouts: JSON.parse(layouts),
        },
      });

      return site;
    },
  });
});
