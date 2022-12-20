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
    site: t.relation('site'),
    apiResponses: t.relation('apiResponses')
  }),
});

builder.mutationField('createOAuthExtension', (t) => 
  t.prismaField({
    type: "Extension",
    args: {
      storeExtensionId: t.arg.string(),
      siteId: t.arg.string(),
      apiConnectorId: t.arg.string(),
      accessToken: t.arg.string()
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.apiConnectorId == null || args.accessToken == null || args.siteId == null || args.storeExtensionId == null) return null;

      //check if api extension is already added
      const check = await prisma.extension.findFirst({
        where: {
          site: {
            id: args.siteId
          },
          storeExtension: {
            id: args.storeExtensionId
          },
          underlayingApis: {
            some: {
              apiConnector: {
                id: args.apiConnectorId
              }
            }
          }
        }
      })
      if (check) return null;

      const oldExtension = await prisma.extension.findFirst({
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

      if(!oldExtension){
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
            // underlayingApis: {
            //   create: {
            //     apiConnector: {
            //       connect: {
            //         id: args.apiConnectorId
            //       }
            //     },
            //     oAuth: {
            //       create: {
            //         accessToken: args.accessToken
            //       }
            //     }
            //   }
            // },
            sortOrder: extensionCount ? extensionCount.length ? extensionCount.length > 0 ? extensionCount.length + 1  : 1 : 1 : 1
          }
        })
        return extension;
      } else {
        const extension = await prisma.extension.update({
          where: {
            id: oldExtension.id
          },
          data: {
            // underlayingApis: {
            //   create: {
            //     apiConnector: {
            //       connect: {
            //         id: args.apiConnectorId
            //       }
            //     },
            //     oAuth: {
            //       create: {
            //         accessToken: args.accessToken
            //       }
            //     }
            //   }
            // }
          }
        })
        return extension;
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