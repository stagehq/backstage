import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prisma";

type Route = {
  id: string,
  url: string,
};

export interface FetchAndCreateProps {
  oAuthId: string,
  siteId: string,
  apiConnectorName: string,
  storeExtensionId: string,
  routes: Route[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data: FetchAndCreateProps = await JSON.parse(req.body);

  //Get token
  const oAuth = await getOAuthToken(data.oAuthId);
  if(!oAuth) res.status(500).json({ error: "oAuth is not in database" });

  //Fetch data from routes
  let prismaCreateManyArray;
  if(oAuth?.accessToken)
  prismaCreateManyArray = await fetchDataFromRoutes(oAuth.accessToken, data.routes, data.apiConnectorName);

  if(prismaCreateManyArray == null) res.status(500).json({ error: "Data fetching failed" });

  //Check if extension is already there
  const extensionCheck = await checkExtension(data.siteId, data.storeExtensionId);

  if (extensionCheck) {

    //check if api is already there
    const apiCheck = await checkApi(extensionCheck.id, data.apiConnectorName);
    if(!apiCheck) {
      //add api to extension
      await prisma.extension.update({
        where: {
          id: extensionCheck.id
        },
        data: {
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
                create: prismaCreateManyArray
              },
            },
          },
        }
      })
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
              create: prismaCreateManyArray
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
}

//fetch data from routes
const fetchDataFromRoutes = async (token: string, routes: Route[], apiConnectorName: string) => {
  const prismaCreationArr: {
    response: string;
    apiConnectorRoute: { connect: { id: string } };
  }[] = [];

  await Promise.all(routes.map(async (route) => {
    const response = await fetch("http://localhost:3000/api/oauth/" + apiConnectorName + "/update", {
      method: 'POST',
      body: JSON.stringify({
        route: route.url,
        token: token,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error)
    });

    prismaCreationArr.push({
      response: response,
      apiConnectorRoute: { connect: { id: route.id} },
    });
  }));
  
  return prismaCreationArr;
}

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
}

//check if extension is already there
const checkApi = async (extensionId: string, apiConnectorName: string) => {
  return await prisma.api.findFirst({
    where: {
      extension: {
        id: extensionId
      },
      apiConnector: {
        name: apiConnectorName
      }
    },
  });
}