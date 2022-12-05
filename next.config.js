const withPrismaPlugin = require("next-prisma-plugin-webpack5");
const intercept = require("intercept-stdout");

module.exports = withPrismaPlugin({
  webpackDevMiddleware: (config) => {
    if (process.env.IS_DOCKER) {
      // "next dev" in Docker doesn't reliably pick up file changes, so we need to enable polling
      // see https://github.com/vercel/next.js/issues/6417 and https://webpack.js.org/configuration/watch/
      config.watchOptions = {
        ...config.watchOptions,
        poll: 500,
      };
    }
    return config;
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      "www.notion.so",
      "notion.so",
      "images.unsplash.com",
      "pbs.twimg.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
});

module.exports = {
  async rewrites() {
    return [
      {
        source: "/app/:any*",
        destination: "/app",
      },
      {
        source: "/sb.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/sb-api/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
    ];
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

// Surpress warning for duplicate atom key – See this issue for more info https://github.com/facebookexperimental/Recoil/issues/733
intercept((text) => (text.includes("Duplicate atom key") ? "" : text));
