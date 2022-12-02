import { atom, atomFamily, selectorFamily } from "recoil";

import { client } from "../graphql/client";
import { GetProjectDocument } from "../graphql/getProject.generated";
import { Project } from "../graphql/types.generated";

// set project slug for fetching project data
export const projectSlugState = atom<string | null>({
  key: "projectSlugState",
  default: null,
});

// set project data in the store
export const projectState = atomFamily<Project | null, string | null>({
  key: "projectState",
  default: selectorFamily({
    key: "projectState/Default",
    get: (projectSlug) => async () => {
      try {
        if (projectSlug === null) return null;

        const response = await client
          .query(GetProjectDocument, {
            slug: projectSlug ? projectSlug : undefined,
          })
          .toPromise();

        return (response.data.project as Project) || null;
      } catch (error) {
        console.error(`projectFetch -> client.query() ERROR: \n${error}`);
        return null;
      }
    },
  }),
});
