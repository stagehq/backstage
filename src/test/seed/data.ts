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
        url: "",
        urlParameter: ["username"],
      },
    ],
  },
  {
    name: "spotify",
    markdown: "best player ever",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        name: "spotify_toptracks",
        url: "",
        urlParameter: [],
      },
    ],
  },
];

export const storeExtensionsData: storeExtensionSeedInput = [
  {
    id: "clbz5lknp001ypgpx1i2lqafr",
    name: "Github",
    description: "Coding Skills",
    image: "/github.tsx",
    markdown:
      "Use this extension to show all your coding skills on your personal site.",
    icon: "CodeBracketIcon",
    routes: [
      {
        name: "github_projects",
      },
    ],
  },
  {
    id: "clbz5lknp001ypgpx1i2lqafy",
    name: "Gitlab",
    description: "Coding Skills",
    image: "gitlab",
    markdown:
      "Use this extension to show all your coding skills on your personal site.",
    icon: "CodeBracketIcon",
    routes: [
      {
        name: "gitlab_projects",
      },
    ],
  },
  {
    id: "clbz5lknp001zpgpx6nbzmxez",
    name: "LinkedIn",
    description: "Professional Experience",
    image: "linkedin",
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
    name: "DEV",
    description: "Writings",
    image: "devto",
    markdown: "This is a extension for your best blog posts.",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "devto_posts",
      },
    ],
  },
  {
    id: "clbz5lknp001zpgpx4nboixep",
    name: "Spotify",
    description: "Personality through music",
    image: "spotify",
    markdown: "This is a extension where you show your musik",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "spotify_toptracks",
      },
    ],
  },
  {
    id: "clbz5lknp001zpgpx4nboixes",
    name: "Funnel",
    description: "Grow your personal brand",
    image: "funnel",
    markdown: "This is a extension where you could grow your brand",
    icon: "BriefcaseIcon",
    routes: [],
  },
];
