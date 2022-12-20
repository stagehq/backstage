import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prisma";

export interface QueryTestTypes {
  oAuthId: string,
  siteId: string,
  apiConnectorName: string,
  storeExtensionId: string,
  routes: [{
    id: string,
    name: string,
    url: string,
    apiConnector: {
      id: string,
      name: string
    }
  }]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data: QueryTestTypes = JSON.parse(req.query.data as string);

  //Fetch data from APIs -----------------------------------------------------

  //Get token
  const oAuth = await prisma.oAuth.findUnique({
    where: {
      id: data.oAuthId,
    },
  });
  //Get route
  const prismaCreationArr: {
    response: string;
    apiConnectorRoute: { connect: { id: string } };
  }[] = [];

  const routes = data.routes;
  await Promise.all(routes.map(async (route) => {

    if(route.apiConnector?.name && oAuth?.accessToken && route.url){
      const response = await fetch("http://localhost:3000/api/oauth/" + route.apiConnector.name + "/update", {
        method: 'POST',
        body: JSON.stringify({
          route: route.url,
          token: oAuth.accessToken,
        }),
      }).then((response) => response.json());

      prismaCreationArr.push({
        response: response,
        apiConnectorRoute: { connect: { id: route.id} },
      });
      console.log(prismaCreationArr);
    }
  }));

  //Create Extension with all submodels -----------------------------------------------------

  //Check if extension is already there
  const check = await prisma.extension.findFirst({
    where: {
      site: {
        id: data.siteId,
      },
      storeExtension: {
        id: data.storeExtensionId,
      },
    },
  });
  if (check) {
    //add api to extension

  } else {
    //create extension
    console.log("next");
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
              create: prismaCreationArr
            },
          },
        },
      },
    });
  }

  res.status(200).json({ test: "test" });
};
