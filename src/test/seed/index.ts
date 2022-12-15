import { Prisma } from "@prisma/client";
import prisma from "../../server/db/prisma";
import { testData } from "./data";

export interface SeedData {
  users: {
    email: string,
    image: string,
    provider: string,
    type: string,
    token_type: string,
    scope: string,
    providerAccountId: string,
  }[],
  sites: {
    id: string,
    subdomain: string,
    extensions: {
      id: string,
      storeExtension: {
        id: string,
        name: string,
      },
      underlayingApis: {
        id: string,
        refreshToken: string,
        accessToken: string,
        apiConnector: {
          id: string,
          name: string,
          markdown: string,
        },
        apiResponses: {
          id: string,
          response: string,
          apiConnectorRoute: {
            id: string,
            name: string,
            url: string,
          },
        }[],
      }[],
    }[],
  }[],
}

// Inspired by prisma/docs#451
async function emptyDatabase() {
  console.log("Emptying database");
  
  const tables = Prisma.dmmf.datamodel.models.map(
    (model) => model.dbName || model.name
  );

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM "public"."${table}";`);
  }
}

async function seedDatabase({ users }: SeedData) {
  console.log("Seeding database");
  // Insert users
  await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  // Insert accounts
  await Promise.all(
    users.map((user) =>
      prisma.account.create({
        data: {
          user: {
            connect: {
              email: user.email,
            },
          },
          provider: user.provider,
          type: user.type,
          token_type: user.token_type,
          scope: user.scope,
          providerAccountId: user.providerAccountId,
        },
      })
    )
  );

  // Insert sites & connect them to their users
  await Promise.all(
    testData.sites.map((site) => {
      return prisma.site.create({
        data: {
          id: site.id,
          subdomain: site.subdomain,
          user: {
            connect: {
              email: testData.users[0].email,
            },
          },
          extensions: {
            create: site.extensions.map((extension) => ({
              id: extension.id,
              storeExtension: {
                connect: {
                  id: extension.storeExtension.id,
                },
              },
              underlayingApis: {
                create: extension.underlayingApis.map((underlayingApi) => ({
                  id: underlayingApi.id,
                  refreshToken: underlayingApi.refreshToken,
                  accessToken: underlayingApi.accessToken,
                  apiConnector: {
                    connect: {
                      id: underlayingApi.apiConnector.id,
                    },
                  },
                  apiResponses: {
                    create: underlayingApi.apiResponses.map((apiResponse) => ({
                      id: apiResponse.id,
                      response: apiResponse.response,
                      apiConnectorRoute: {
                        connect: {
                          id: apiResponse.apiConnectorRoute.id,
                        },
                      },
                    })),
                  },
                })),
              },
            })),
          },
        },
      });
    })
  );
}

export async function reseedDatabase(data: SeedData = testData) {
  await emptyDatabase();
  await seedDatabase(data);
}
