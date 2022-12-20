import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Extension', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (extension) => extension.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: extension => extension.createdAt.toString()}),
    modifiedAt: t.string({ resolve: extension => extension.modifiedAt.toString()}),
    sortOrder: t.exposeInt('sortOrder'),

    storeExtension: t.relation('storeExtension'),
    underlayingApis: t.relation('underlayingApis'),
    site: t.relation('site')
  }),
});

builder.mutationField('createOAuthExtension', (t) => 
  t.prismaField({
    type: "Extension",
    args: {
      storeExtensionId: t.arg.string(),
      siteId: t.arg.string(),
      apiId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.siteId == null || args.storeExtensionId == null || args.apiId == null) return null;
      
      // check if extension is already there
      const extension = await prisma.extension.findFirst({
        where: {
          site: {
            id: args.siteId
          },
          storeExtension: {
            id: args.storeExtensionId
          },
        }
      })
      if (extension) {

        //only connect new api
        const newExtension = await prisma.extension.update({
          where: {
            id: extension.id
          },
          data: {
            sortOrder: 0,
            site: {
              connect: {
                id: args.siteId
              }
            },
            storeExtension: {
              connect: {
                id: args.storeExtensionId
              }
            },
            underlayingApis: {
              connect: {
                id: args.apiId
              }
            }
          }
        })

        return newExtension;

      } else {

        //create new extension
        const newExtension = await prisma.extension.create({
          data: {
            sortOrder: 0,
            site: {
              connect: {
                id: args.siteId
              }
            },
            storeExtension: {
              connect: {
                id: args.storeExtensionId
              }
            },
            underlayingApis: {
              connect: {
                id: args.apiId
              }
            }
          }
        })
        return newExtension;
      }     
    } 
  })
);

builder.mutationField('createLinkedInExtension', (t) => 
  t.prismaField({
    type: "Extension",
    args: {
      storeExtensionId: t.arg.string(),
      siteId: t.arg.string(),
      linkedInUrl: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.linkedInUrl == null || args.siteId == null || args.storeExtensionId == null) return null;

      //check if 
      const check = await prisma.extension.findFirst({
        where: {
          site: {
            id: args.siteId
          },
          storeExtension: {
            id: args.storeExtensionId
          }
        }
      })
      if (check) return null;
      
      const extensionCount = await prisma.site.findFirst({
        where: {
          id: args.siteId
        }
      }).extensions();

      const extension = await prisma.extension.create({
        data: {
          site: {
            connect: {
              id: args.siteId
            }
          },
          storeExtension: {
            connect: {
              id: args.storeExtensionId
            }
          },
          sortOrder: extensionCount ? extensionCount.length ? extensionCount.length > 0 ? extensionCount.length + 1  : 1 : 1 : 1
        }
      })
      return extension;
    }
  })
);

builder.mutationField('createWebLinkExtension', (t) => 
  t.prismaField({
    type: "Extension",
    args: {
      storeExtensionId: t.arg.string(),
      siteId: t.arg.string(),
      webLinks: t.arg.stringList(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.webLinks == null || args.webLinks.length === 0 || args.siteId == null || args.storeExtensionId == null) return null;
      //check if 
      const check = await prisma.extension.findFirst({
        where: {
          site: {
            id: args.siteId
          },
          storeExtension: {
            id: args.storeExtensionId
          }
        }
      })
      if (check) return null;
      
      const extensionCount = await prisma.site.findFirst({
        where: {
          id: args.siteId
        }
      }).extensions();

      const extension = await prisma.extension.create({
        data: {
          site: {
            connect: {
              id: args.siteId
            }
          },
          storeExtension: {
            connect: {
              id: args.storeExtensionId
            }
          },
          sortOrder: extensionCount ? extensionCount.length ? extensionCount.length > 0 ? extensionCount.length + 1  : 1 : 1 : 1
        }
      })
      return extension;
    }
  })
);