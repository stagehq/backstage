import { ApiConnector, StoreExtension } from "@prisma/client";
import prisma from "../db/prisma";
import { apiConnectorsData, storeExtensionsData } from "./data";

interface ApiConnectorRemove {
  createdAt: Date;
  modifiedAt: Date;
}

export interface ApiConnectorUpdate extends Omit<ApiConnector, keyof ApiConnectorRemove> {
  apiConnectorRoutes: {
    id: string;
    name: string;
    url: string;
    urlParameter?: string[];
  }[];
}

interface StoreExtensionRemove {
  createdAt: Date;
  modifiedAt: Date;
}

export interface StoreExtensionUpdate extends Omit<StoreExtension, keyof StoreExtensionRemove> {
  routes: {
    name: string;
  }[];
}

export async function updateStore(
  apiConnectors: ApiConnectorUpdate[],
  storeExtensions: StoreExtensionUpdate[]
) {

  //create apiConnectors
  await Promise.all(
    apiConnectors.map(async (apiConnector) => {
      const a = await prisma.apiConnector.upsert({
        where: {
          id: apiConnector.id,
        },
        update: {
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
        create: {
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
      const e = await prisma.storeExtension.upsert({
        where: {
          id: storeExtension.id,
        },
        update: {
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
        create: {
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

// execute the function
updateStore(apiConnectorsData, storeExtensionsData);
