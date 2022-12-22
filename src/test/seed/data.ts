import { AuthType } from "@prisma/client";
import { apiConnectorSeedInput, storeExtensionSeedInput } from "./index";

export const apiConnectorsData: apiConnectorSeedInput = [
  {
    name: "github",
    markdown:
      "GitHub is where over 94 million developers shape the future of software, together.",
    authType: AuthType.oAuth,
    apiConnectorRoutes: [
      {
        name: "github_projects",
        url: "/user/projects",
      },
    ],
  },
  {
    name: "gitlab",
    markdown:
      "From planning to production, GitLab brings teams together to shorten cycle times, reduce costs, strengthen security, and increase developer productivity.",
    authType: AuthType.oAuth,
    apiConnectorRoutes: [
      {
        name: "gitlab_projects",
        url: "/v4/projects",
      },
    ],
  },
  {
    name: "linkedin",
    markdown:
      "LinkedIn is the world's largest professional network on the internet.",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        name: "linkedin_cv",
        url: "/api/v2/linkedin",
        urlParameter: ["linkedin_url"],
      },
    ],
  },
];

export const storeExtensionsData: storeExtensionSeedInput = [
  {
    name: "Repositories",
    markdown:
      "Use this extension to show all your coding skills on your personal site.",
    icon: "CodeBracketIcon",
    routes: [
      {
        name: "github_projects",
      },
      {
        name: "gitlab_projects",
      },
    ],
  },
  {
    name: "Resume",
    markdown: "Use this extension to show your professional experience.",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "linkedin_cv",
      },
    ],
  },
];
