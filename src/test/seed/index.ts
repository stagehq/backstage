import { AuthType, Prisma, PrismaClient } from "@prisma/client";
// import prisma from "../../server/db/prisma";

const prisma = new PrismaClient();

export type apiConnectorSeedInput = {
  name: string;
  markdown: string;
  authType: AuthType;
  apiConnectorRoutes: {
    name: string;
    url: string;
    urlParameter?: string[];
  }[];
}[];

export type storeExtensionSeedInput = {
  name: string;
  markdown: string;
  icon: string;
  routes: {
    name: string;
  }[];
}[];

// Inspired by prisma/docs#451
async function emptyDatabase() {
  console.log("Emptying database");

  const tables = Prisma.dmmf.datamodel.models.map(
    (model) => model.dbName || model.name
  );

  return Promise.all(
    tables.map((table) => prisma.$executeRawUnsafe(`DELETE FROM "${table}";`))
  );
}

async function seedDatabase(
  apiConnectors: apiConnectorSeedInput,
  storeExtensions: storeExtensionSeedInput
) {
  //console.log("Seeding database");

  //create apiConnectors
  await Promise.all(
    apiConnectors.map(async (apiConnector) => {
      const a = await prisma.apiConnector.create({
        data: {
          name: apiConnector.name,
          markdown: apiConnector.markdown,
          authType: apiConnector.authType,
          apiConnectorRoute: {
            create: apiConnector.apiConnectorRoutes.map((route) => {
              return {
                name: route.name,
                url: route.url,
                urlParameter: route.urlParameter,
              };
            }),
          },
        },
      });
      console.log(a);
    })
  );

  //console.log("start with e");
  //create storeExtensions
  await Promise.all(
    storeExtensions.map(async (storeExtension) => {
      const e = await prisma.storeExtension.create({
        data: {
          name: storeExtension.name,
          markdown: storeExtension.markdown,
          icon: storeExtension.icon,
          routes: {
            connect: storeExtension.routes.map((route) => {
              return {
                name: route.name,
              };
            }),
          },
        },
      });
      console.log(e);
    })
  );
}

export async function reseedDatabase(
  apiConnectors: apiConnectorSeedInput,
  storeExtensions: storeExtensionSeedInput
) {
  console.log("test");
  await emptyDatabase();
  await seedDatabase(apiConnectors, storeExtensions);
}
