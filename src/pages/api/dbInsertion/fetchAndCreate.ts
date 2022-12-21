import { AuthType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prisma";

type Route = {
  id: string;
  url: string;
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
  const data: FetchAndCreateProps = await JSON.parse(req.body);
  let prismaCreateRoutesArray;
  let prismaCreatePreferencesArray;

  //Generate preferences Array
  if (data.preferences) {
    prismaCreatePreferencesArray = await generatePreferencesArray(
      data.preferences,
      data.userId
    );
    console.log(prismaCreatePreferencesArray);
  }

  //---------------------------------------------------------------------------------------------------------------

  //Get data
  if (data.authType !== AuthType.preferences && data.oAuthId) {
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

  //Check if extension is already there
  const extensionCheck = await checkExtension(
    data.siteId,
    data.storeExtensionId
  );

  if (extensionCheck) {
    //check if api is already there
    const apiCheck = await checkApi(extensionCheck.id, data.apiConnectorName);
    if (!apiCheck) {
      //add api to extension
      console.log("add api to extension");
      
      await prisma.extension.update({
        where: {
          id: extensionCheck.id,
        },
        data: {
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
      });
      res.status(200).json({ data: "The extension was successfully updated" });
    } else {
      res.status(500).json({ error: "Api already added" });
    }
  } else {
    //create extension
    await prisma.extension.create({
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
            oAuth: {
              connect: {
                id: data.oAuthId,
              },
            },
            apiResponses: {
              create: prismaCreateRoutesArray,
            },
            preferences: {
              create: prismaCreatePreferencesArray,
            },
          },
        },
      },
    });
    res.status(200).json({ data: "The extension was successfully created" });
  }
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
      const response = await fetch(
        "http://localhost:3000/api/oauth/" + apiConnectorName + "/update",
        {
          method: "POST",
          body: JSON.stringify({
            route: route.url,
            token: token,
            preferences: preferences,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .catch((error) => {
          console.log(error);
        });

      prismaCreationArr.push({
        response: response,
        apiConnectorRoute: { connect: { id: route.id } },
      });
    })
  );

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

  await Promise.all(
    routes.map(async (route) => {
      const response = await fetch(
        "http://localhost:3000/api/nonOAuth/" + apiConnectorName + "/update",
        {
          method: "POST",
          body: JSON.stringify({
            route: route.url,
            preferences: preferences,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .catch((error) => {
          console.log(error);
        });

      prismaCreationArr.push({
        response: response,
        apiConnectorRoute: { connect: { id: route.id } },
      });
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

//check if extension is already there
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
