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
        url: "/user/repos?sort=stars&direction=desc&per_page=100&type=owner",
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
        url: "/api/v4/users/user_id/projects?order_by=last_activity_at&sort=desc&per_page=100&membership=true",
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
    authType: AuthType.oAuth,
    apiConnectorRoutes: [
      {
        name: "spotify_toptracks",
        url: "/v1/me/top/tracks?time_range=short_term&limit=5",
      },
    ],
  },
  {
    name: "funnel",
    markdown: "best funnel ever",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        name: "funnel_empty",
        url: "",
        urlParameter: ["email"],
      },
    ],
  },
  {
    name: "stackoverflow",
    markdown: "stackoverflow top answers",
    authType: AuthType.oAuth,
    apiConnectorRoutes: [
      {
        name: "stackoverflow_answers",
        url: "/2.3/me/answers?order=desc&sort=votes&site=stackoverflow",
      },
    ],
  },
];

export const storeExtensionsData: storeExtensionSeedInput = [
  {
    id: "clbz5lknp001ypgpx1i2lqafr",
    name: "GitHub",
    description: "Coding Skills",
    image: "github",
    blockId: "github_Repositories",
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
    name: "GitLab",
    description: "Coding Skills",
    image: "gitlab",
    blockId: "gitlab_Repositories",
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
    blockId: "linkedin_Resume",
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
    blockId: "devto_BlogPosts",
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
    blockId: "spotify_Music",
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
    blockId: "basic_Funnel",
    markdown: "This is a extension where you could grow your brand",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "funnel_empty",
      },
    ],
  },
  {
    id: "clbz5lknp001zpgpx4nboixet",
    name: "Stackoverflow",
    description: "Show skills through answers",
    image: "stackoverflow",
    blockId: "stackoverflow_Answers",
    markdown: "This is a extension where you show your answers",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "stackoverflow_answers",
      },
    ],
  },
];
