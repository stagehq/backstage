import { AuthType, PrismaClient } from "@prisma/client";
// import prisma from "../../server/db/prisma";

const prisma = new PrismaClient();

export type apiConnectorSeedInput = {
  id: string;
  name: string;
  markdown: string;
  authType: AuthType;
  apiConnectorRoutes: {
    id: string;
    name: string;
    url: string;
    urlParameter?: string[];
  }[];
}[];

export type storeExtensionSeedInput = {
  id: string;
  name: string;
  description: string;
  image: string;
  blockId: string;
  markdown: string;
  icon: string;
  routes: {
    name: string;
  }[];
}[];

// Inspired by https://github.com/prisma/docs/issues/451#issuecomment-1354500062
async function emptyDatabase() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
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
          id: apiConnector.id,
          name: apiConnector.name,
          markdown: apiConnector.markdown,
          authType: apiConnector.authType,
          apiConnectorRoute: {
            create: apiConnector.apiConnectorRoutes.map((route) => {
              return {
                id: route.id,
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
          id: storeExtension.id,
          name: storeExtension.name,
          description: storeExtension.description,
          image: storeExtension.image,
          blockId: storeExtension.blockId,
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
