import { AuthType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";
import prisma from "../../../server/db/prisma";

type Route = {
  id: string;
  url: string;
  apiConnector: {
    name: string;
  };
};

type Preference = {
  key: string;
  value: string;
};

export interface FetchAndCreateProps {
  oAuthId?: string;
  preferences?: Preference[];
  userId: string;
  siteId: string;
  apiConnectorName: string;
  storeExtensionId: string;
  routes: Route[];
  authType: AuthType;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("I am on the fetch route");
  const data: FetchAndCreateProps = await JSON.parse(req.body);
  console.log(data);
  let prismaCreateRoutesArray;
  let prismaCreatePreferencesArray;

  //Generate preferences Array
  if (data.preferences) {
    console.log("We have prefernces");
    prismaCreatePreferencesArray = await generatePreferencesArray(
      data.preferences,
      data.userId
    );
    console.log(prismaCreatePreferencesArray);
  }

  //---------------------------------------------------------------------------------------------------------------

  //Get data
  if (data.authType !== AuthType.preferences && data.oAuthId) {
    console.log("We have oAuth");
    //handle oauth and oauth with preferences
    const oAuth = await getOAuthToken(data.oAuthId);
    if (!oAuth) res.status(404).json({ error: "oAuth is not in database" });

    //Fetch data from routes
    if (oAuth?.accessToken) {
      prismaCreateRoutesArray = await fetchDataFromRoutes(
        oAuth.accessToken,
        data.routes,
        data.apiConnectorName,
        data.preferences
      );

      if (prismaCreateRoutesArray == null)
        res.status(500).json({ error: "Data fetching failed" });
    }
  } else {
    console.log("Only preferences");
    //handle without oauth
    if (data.preferences) {
      prismaCreateRoutesArray = await fetchDataFromRoutesWithoutOAuth(
        data.routes,
        data.apiConnectorName,
        data.preferences
      );
      console.log(prismaCreateRoutesArray);
    }
  }

  //---------------------------------------------------------------------------------------------------------------

  //create extension
  console.log("create extension");
  console.log(prismaCreateRoutesArray);
  const extension = await prisma.extension.create({
    data: {
      sortOrder: 0,
      site: {
        connect: {
          id: data.siteId,
        },
      },
      storeExtension: {
        connect: {
          id: data.storeExtensionId,
        },
      },
      underlayingApis: {
        create: {
          apiConnector: {
            connect: {
              name: data.apiConnectorName,
            },
          },
          ...(data.authType !== AuthType.preferences && {
            oAuth: {
              connect: {
                id: data.oAuthId,
              },
            },
          }),
          apiResponses: {
            create: prismaCreateRoutesArray,
          },
          preferences: {
            create: prismaCreatePreferencesArray,
          },
        },
      },
    },
    include: {
      storeExtension: true,
      underlayingApis: {
        include: {
          apiConnector: true,
          apiResponses: true,
        },
      },
    },
  });
  res.status(200).json({ extension: extension });

};

//fetch oAuthToken
const getOAuthToken = async (oAuthId: string) => {
  return await prisma.oAuth.findUnique({
    where: {
      id: oAuthId,
    },
  });
};

//generate preferences array
const generatePreferencesArray = async (
  preferences: Preference[],
  userId: string
) => {
  const prismaCreationArr: {
    key: string;
    value: string;
    user: { connect: { id: string } };
  }[] = [];

  await Promise.all(
    preferences.map(async (preference) => {
      prismaCreationArr.push({
        key: preference.key,
        value: preference.value,
        user: { connect: { id: userId } },
      });
    })
  );

  return prismaCreationArr;
};

//fetch data from routes
const fetchDataFromRoutes = async (
  token: string,
  routes: Route[],
  apiConnectorName: string,
  preferences: Preference[] | undefined
) => {
  const prismaCreationArr: {
    response: string;
    apiConnectorRoute: { connect: { id: string } };
  }[] = [];

  console.log("fetch data from routes");

  await Promise.all(
    routes.map(async (route) => {
      if (route.apiConnector.name === apiConnectorName) {
        await wretch(
          `http://localhost:3000/api/oauth/${apiConnectorName}/update`
        )
          .post({
            route: route.url,
            token: token,
            preferences: preferences,
          })
          .json((json) => {
            prismaCreationArr.push({
              response: json,
              apiConnectorRoute: { connect: { id: route.id } },
            });
          });
      }
    })
  );

  console.log(prismaCreationArr);

  return prismaCreationArr;
};

//fetch data from routes
const fetchDataFromRoutesWithoutOAuth = async (
  routes: Route[],
  apiConnectorName: string,
  preferences: Preference[]
) => {
  const prismaCreationArr: {
    response: string;
    apiConnectorRoute: { connect: { id: string } };
  }[] = [];

  console.log(apiConnectorName);
  console.log(routes);

  await Promise.all(
    routes.map(async (route) => {
      if (route.apiConnector.name === apiConnectorName) {
        await wretch(
          `http://localhost:3000/api/nonOAuth/${apiConnectorName}/update`
        )
          .post({
            route: route.url,
            preferences: preferences,
          })
          .json((json) => {
            prismaCreationArr.push({
              response: json,
              apiConnectorRoute: { connect: { id: route.id } },
            });
          });
      }
    })
  );

  return prismaCreationArr;
};

//check if extension is already there
const checkExtension = async (siteId: string, storeExtensionId: string) => {
  return await prisma.extension.findFirst({
    where: {
      site: {
        id: siteId,
      },
      storeExtension: {
        id: storeExtensionId,
      },
    },
  });
};

//check if api is already there
const checkApi = async (extensionId: string, apiConnectorName: string) => {
  return await prisma.api.findFirst({
    where: {
      extension: {
        id: extensionId,
      },
      apiConnector: {
        name: apiConnectorName,
      },
    },
  });
};
