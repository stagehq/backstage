import { AuthType } from "@prisma/client";
import { apiConnectorSeedInput, storeExtensionSeedInput } from "./index";

export const apiConnectorsData: apiConnectorSeedInput = [
  {
    id: "cleee4xhi00igeobkfevk6t4k",
    name: "github",
    markdown:
      "GitHub is where over 94 million developers shape the future of software, together.",
    authType: AuthType.oAuth,
    apiConnectorRoutes: [
      {
        id: "cleee4xhi00iieobkp05dtpag",
        name: "github_projects",
        url: "/user/repos?sort=stars&direction=desc&per_page=100&type=owner",
      },
    ],
  },
  {
    id: "cleee4xhi00ifeobkzirr5y9b",
    name: "gitlab",
    markdown:
      "From planning to production, GitLab brings teams together to shorten cycle times, reduce costs, strengthen security, and increase developer productivity.",
    authType: AuthType.oAuth,
    apiConnectorRoutes: [
      {
        id: "cleee4xhi00iheobkpxukkafn",
        name: "gitlab_projects",
        url: "/api/v4/users/user_id/projects?order_by=last_activity_at&sort=desc&per_page=100&membership=true",
      },
    ],
  },
  {
    id: "cleea34v700eseobkeq757sq1",
    name: "linkedin",
    markdown:
      "LinkedIn is the world's largest professional network on the internet.",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        id: "cleee4xhj00iqeobk0e5mm5js",
        name: "linkedin_cv",
        url: "/api/v2/linkedin",
        urlParameter: ["linkedin_url"],
      },
    ],
  },
  {
    id: "cleea34v700f4eobkirj1t7mt",
    name: "devto",
    markdown:
      "Dev.to is the blog platform developers love for their simplicity.",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        id: "cleee4xhj00ixeobkedim5sw4",
        name: "devto_posts",
        url: "",
        urlParameter: ["username"],
      },
    ],
  },
  {
    id: "cleea34v800faeobkwbvuvs2k",
    name: "spotify",
    markdown: "best player ever",
    authType: AuthType.oAuth,
    apiConnectorRoutes: [
      {
        id: "cleee4xhj00j0eobkrh6b3i5j",
        name: "spotify_toptracks",
        url: "/v1/me/top/tracks?time_range=short_term&limit=5",
      },
    ],
  },
  {
    id: "cleea34v800fceobk1p38j188",
    name: "funnel",
    markdown: "best funnel ever",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        id: "cleee4xhj00j8eobkty4t3z08",
        name: "funnel_empty",
        url: "",
        urlParameter: ["email"],
      },
    ],
  },
  {
    id: "cleea34v900fmeobkb7lqq4wr",
    name: "images",
    markdown: "best image block",
    authType: AuthType.preferences,
    apiConnectorRoutes: [
      {
        id: "cleee4xhl00jgeobkzju5z2nf",
        name: "image_single",
        url: "",
        urlParameter: ["image path"],
      },
    ],
  },
  // {
  //   id: "cleea34va00fseobklnfql48q",
  //   name: "stackoverflow",
  //   markdown: "stackoverflow top answers",
  //   authType: AuthType.oAuth,
  //   apiConnectorRoutes: [
  //     {
  //       id: "cleee4xhq00jmeobka427slfr",
  //       name: "stackoverflow_answers",
  //       url: "/2.3/me/answers?order=desc&sort=votes&site=stackoverflow",
  //     },
  //   ],
  // },
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
    image: "freefunnel",
    blockId: "basic_Funnel",
    markdown: "This is a extension where you could grow your brand",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "funnel_empty",
      },
    ],
  },
  // {
  //   id: "clbz5lknp001zpgpx4nboixet",
  //   name: "Stackoverflow",
  //   description: "Show skills through answers",
  //   image: "stackoverflow",
  //   blockId: "stackoverflow_Answers",
  //   markdown: "This is a extension where you show your answers",
  //   icon: "BriefcaseIcon",
  //   routes: [
  //     {
  //       name: "stackoverflow_answers",
  //     },
  //   ],
  // },
  {
    id: "clbz5lknp001zpgpx4nboixelst",
    name: "Images",
    description: "Paste your own image",
    image: "images",
    blockId: "image_single",
    markdown: "This is a extension where you show your answers",
    icon: "BriefcaseIcon",
    routes: [
      {
        name: "image_single",
      },
    ],
  },
];
