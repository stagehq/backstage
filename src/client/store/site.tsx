import { atom, atomFamily, selectorFamily } from "recoil";

import { client } from "../graphql/client";
import { GetSiteDocument } from "../graphql/getSite.generated";
import { Site } from "../graphql/types.generated";

// set project slug for fetching project data
export const siteSlugState = atom<string | null>({
  key: "siteSlugState",
  default: null,
});

// set project data in the store
export const siteState = atomFamily<Site | null, string | null>({
  key: "siteState",
  default: selectorFamily({
    key: "siteState/Default",
    get: (siteSlug) => async () => {
      try {
        if (siteSlug === null) return null;

        const response = await client
          .query(GetSiteDocument, {
            subdomain: siteSlug ? siteSlug : undefined,
          })
          .toPromise();
        return (response.data.getSite as Site) || null;
      } catch (error) {
        console.error(`siteFetch -> client.query() ERROR: \n${error}`);
        return null;
      }
    },
  }),
});
