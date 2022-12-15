import { SeedData } from "./index";

export const testData: SeedData = {
  users: [
    {
      email: "nils.jacobsen98@gmail.com",
      image: "https://avatars.githubusercontent.com/u/58360188?v=4",
      provider: "github",
      type: "oauth",
      token_type: "bearer",
      scope: "read:user,user:email",
      providerAccountId: "58360188",
    },
    {
      email: "kontakt@felixhaeberle.de",
      image: "https://avatars.githubusercontent.com/u/34959078?v=4",
      provider: "github",
      type: "oauth",
      token_type: "bearer",
      scope: "read:user,user:email",
      providerAccountId: "34959078",
    }
  ],
  sites: [
    {
      id: "934293746928734928374",
      subdomain: "nilsjacobsen",
      extensions: [
        {
          id: "2376491287369123",
          storeExtension: {
            id: "w9909823049852034",
            name: "Repositories"
          },
          underlayingApis: [
            {
              id: "87934759374985",
              refreshToken: "9348793475347534",
              accessToken: "9e8r9w7r98e7rt98",
              apiConnector: {
                id: "39749345763945",
                name: "Github",
                markdown: "This is a description"
              },
              apiResponses: [
                {
                  id: "93845793845938",
                  response: "{name: recentProjects, data: ['First', 'Second']}",
                  apiConnectorRoute: {
                    id: "3948579374593",
                    name: "RecentProjects",
                    url: "/projects/recent"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "934293746928734928374",
      subdomain: "felixhaeberle",
      extensions: [
        {
          id: "2376491287369123",
          storeExtension: {
            id: "w9909823049852034",
            name: "Repositories"
          },
          underlayingApis: [
            {
              id: "87934759374985",
              refreshToken: "9348793475347534",
              accessToken: "9e8r9w7r98e7rt98",
              apiConnector: {
                id: "39749345763945",
                name: "Github",
                markdown: "This is a description"
              },
              apiResponses: [
                {
                  id: "93845793845938",
                  response: "{name: recentProjects, data: ['First', 'Second']}",
                  apiConnectorRoute: {
                    id: "3948579374593",
                    name: "RecentProjects",
                    url: "/projects/recent"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
  ],
};

