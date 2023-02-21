import {
  createClient,
  dedupExchange,
  errorExchange,
  Exchange,
  fetchExchange,
} from "urql";

import { devtoolsExchange } from "@urql/devtools";
import toast from "react-hot-toast";

/**
 * Consistently determine the API URL for the current client even when in a deploy preview or similar
 */
const getAPIURl = (): string => {
  // In the browser we just use a relative URL and everything works perfectly
  if (process.browser) return `/api`;

  // Infer the deploy URL if we're in production
  // VERCEL_URL = Vercel, DEPLOY_URL = Netlify
  const PROVIDER_URL = process.env.VERCEL_URL || process.env.DEPLOY_URL;

  if (PROVIDER_URL) {
    // We replace https:// from the URL if it exists and add it ourselves always at the beginning as the above environment variables are not guaranteed to include it
    return `https://${PROVIDER_URL.replace(/^https?:\/\//, "")}/api`;
  }

  // Finally, fallback to hard-coded URL in case nothing else works
  if (process.env.NODE_ENV === `development`)
    return `http://localhost:3000/api`;

  // TODO: Replace with your production URL for the very final fallback
  return "https://example.org";
};

const defaultExchanges = [
  errorExchange({
    onError: (error) => {
      toast.error(error.message.replace("[GraphQL]", "Server error:"));
    },
  }),
  dedupExchange,
  // cacheExchange<GraphCacheConfig>({
  //   // resolvers: {
  //   //   // https://formidable.com/open-source/urql/docs/graphcache/local-resolvers/#relay-pagination
  //   //   Project: { contributors: relayPagination({ mergeMode: "inwards" }) },
  //   //   User: {
  //   //     userProjectRelations: relayPagination({ mergeMode: "inwards" }),
  //   //   },
  //   // },
  // }),
  fetchExchange,
];

export const client = createClient({
  fetchOptions: {
    credentials: "include",
  },
  requestPolicy: `cache-and-network`,
  url: getAPIURl(),
  exchanges:
    process.env.NODE_ENV === `development`
      ? ([devtoolsExchange, ...defaultExchanges] as Exchange[])
      : ([...defaultExchanges] as Exchange[]),
});
