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
        url: "/user/repos",
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
        url: "/api/v4/projects",
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
  {
    name: "devto",
    markdown:
      "Dev.to is the blog platform developers love for their simplicity.",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        name: "devto_posts",
        url: "/api/articles/me/published",
        urlParameter: ["api_key"],
      },
    ],
  },
  {
    name: "medium",
    markdown:
      "Medium is the blog platform everybody love for their simplicity.",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        name: "medium_posts",
        url: "/api/articles/me/published",
        urlParameter: ["medium_key"],
      },
    ],
  },
];

export const storeExtensionsData: storeExtensionSeedInput = [
  {
    id: "clbz5lknp001ypgpx1i2lqafr",
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
    id: "clbz5lknp001zpgpx6nbzmxez",
    name: "Resume",
    markdown: "Use this extension to show your professional experience.",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "linkedin_cv",
      },
    ],
  },
    {
    id: "clbz5lknp001zpgpx4nboixez",
    name: "Blog Posts",
    markdown: "This is a extension for your best blog posts.",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "devto_posts",
      },
    ],
  },
];
