import { atom, atomFamily, selectorFamily } from "recoil";

import { client } from "../graphql/client";
import { GetIdeaDocument } from "../graphql/getIdea.generated";
import { Idea } from "../graphql/types.generated";

// set idea slug for fetching project data
export const ideaNumberState = atom<number | null>({
  key: "ideaNumberState",
  default: null,
});

// set idea data in the store
export const ideaState = atomFamily<Idea | null, (string | number | null)[]>({
  key: "ideaState",
  default: selectorFamily({
    key: "ideaState/Default",
    get:
      ([ideaNumber, projectSlug]) =>
      async () => {
        try {
          if (ideaNumber && projectSlug) {
            const response = await client
              .query(GetIdeaDocument, {
                ideaNumber: ideaNumber as number,
                projectSlug: projectSlug as string,
              })
              .toPromise();

            return (response.data.idea as Idea) || null;
          } else {
            return null;
          }
        } catch (error) {
          console.error(`ideaFetch -> client.query() ERROR: \n${error}`);
          return null;
        }
      },
  }),
});
