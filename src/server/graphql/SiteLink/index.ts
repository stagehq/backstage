import { builder } from '../builder';

builder.prismaNode('SiteLink', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (siteLink) => siteLink.id },
  fields: (t) => ({
    siteId: t.exposeString('siteId'),
    url: t.exposeString('url'),
    title: t.exposeString('title'),
    description: t.exposeString('description'),
    image: t.exposeString('image'),
    createdAt: t.string({ resolve: siteLink => siteLink.createdAt.toString()}),
    modifiedAt: t.string({ resolve: siteLink => siteLink.modifiedAt.toString()}),
  }),
});