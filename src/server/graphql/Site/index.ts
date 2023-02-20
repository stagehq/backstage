import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Site', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (site) => site.id },
  fields: (t) => ({
    tagline: t.exposeString('tagline'),
    bio: t.exposeString('bio'),
    subdomain: t.exposeString('subdomain'),
    image: t.exposeString('image'),
    images: t.relation('images'),
    links: t.relation('links'),
    layouts: t.field({ type: 'JSON', resolve: site => site.layouts}),
    socials: t.field({ type: 'JSON', resolve: site => site.socials}),
    createdAt: t.string({ resolve: site => site.createdAt.toString()}),
    modifiedAt: t.string({ resolve: site => site.modifiedAt.toString()}),

    extensions: t.relation('extensions'),
    analytics: t.relation('analytics')
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

builder.queryField('getValidSubdomain', (t) =>
  t.prismaField({
    type: "Site",
    args: {
      subdomain: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { subdomain }, ctx) => {
      if (!ctx.session.user.email) return null;

      return prisma.site.findFirst({
        where: { 
          subdomain: subdomain 
        },
      })
    }
  })
);

builder.mutationField('upsertSite', (t) => {
  return t.prismaField({
    type: 'Site',
    args: {
      subdomain: t.arg.string({ required: true }),
      tagline: t.arg.string({ required: false }),
      bio: t.arg.string({ required: false }),
      layouts: t.arg.string({ required: false }),
      image: t.arg.string({ required: false }),
    },
    resolve: async (query, root, { subdomain, tagline, bio, layouts, image }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.upsert({
        where: {
          subdomain: subdomain,
        },
        update: {
          tagline: tagline ? tagline : undefined,
          bio: bio ? bio : undefined,
          layouts: layouts ? JSON.parse(layouts) : undefined,
          image: image ? image : undefined
        },
        create: {
          user: {
            connect: {
              email: ctx.session.user.email,
            },
          },
          subdomain: subdomain,
          tagline: tagline ? tagline : undefined,
          bio: bio ? bio : undefined,
          image: image ? image : undefined
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
      siteId: t.arg.string({ required: true }),
      tagline: t.arg.string({ required: false }),
      image: t.arg.string({ required: false }),
      bio: t.arg.string({ required: false }),
    },
    resolve: async (query, root, { siteId, tagline, bio, image }, ctx) => {
      if (!ctx.session.user.email || siteId == null) return null;

      const site = await prisma.site.update({
        where: {
          id: siteId,
        },
        data: {
          tagline: tagline ? tagline : undefined,
          bio: bio ? bio : undefined,
          image: image ? image : undefined
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

builder.mutationField('updateSiteSubdomain', (t) => {
  return t.prismaField({
    type: 'Site',
    args: {
      id: t.arg.string({ required: true }),
      subdomain: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { id, subdomain }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.update({
        where: {
          subdomain: id,
        },
        data: {
          subdomain: subdomain,
        },
      });

      return site;
    },
  });
});

builder.mutationField('updateSiteSocials', (t) => {
  return t.prismaField({
    type: 'Site',
    args: {
      id: t.arg.string({ required: true }),
      socials: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { id, socials }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.update({
        where: {
          subdomain: id,
        },
        data: {
          socials: JSON.parse(socials),
        },
      });

      return site;
    },
  });
});

builder.mutationField('deleteSite', (t) => {
  return t.prismaField({
    type: 'Site',
    args: {
      subdomain: t.arg.string({ required: true }),
    },
    resolve: async (query, root, { subdomain }, ctx) => {
      if (!ctx.session.user.email) return null;

      const site = await prisma.site.delete({
        where: {
          subdomain: subdomain,
        },
      });

      return site;
    },
  });
});
