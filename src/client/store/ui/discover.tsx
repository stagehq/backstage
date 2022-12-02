import { atom, atomFamily, selectorFamily } from "recoil";
import { client } from "../../graphql/client";
import { GetIdeaSearchResultDocument } from "../../graphql/getIdeaSearchResult.generated";
import { GetProjectSearchResultDocument } from "../../graphql/getProjectSearchResult.generated";
import { GetUserSearchResultDocument } from "../../graphql/getUserSearchResult.generated";
import { Idea, Project, User } from "../../graphql/types.generated";

// store for discover search input
export const discoverSearchInputState = atom<string>({
  key: "discoverSearchInputState",
  default: "",
});

// store for discover project search result
export const discoverProjectSearchResultState = atomFamily<
  [Project] | null,
  string | null
>({
  key: "discoverProjectSearchResultState",
  // set discover search result based on discover search input
  default: selectorFamily({
    key: "discoverProjectSearchResultState/Default",
    get: (discoverSearchInput) => async () => {
      try {
        if (discoverSearchInput === "") return null;

        const response = await client
          .query(GetProjectSearchResultDocument, {
            query: discoverSearchInput,
          })
          .toPromise();

        console.log(response);

        return (response.data.getProjectSearchResult as [Project]) || null;
      } catch (error) {
        console.error(
          `discoverSearch: Projects -> client.query() ERROR: \n${error}`
        );
        return null;
      }
    },
  }),
});

// store for discover idea search result
export const discoverIdeaSearchResultState = atomFamily<
  [Idea] | null,
  string | null
>({
  key: "discoverIdeaSearchResultState",
  // set discover search result based on discover search input
  default: selectorFamily({
    key: "discoverIdeaSearchResultState/Default",
    get: (discoverSearchInput) => async () => {
      try {
        if (discoverSearchInput === "") return null;

        const response = await client
          .query(GetIdeaSearchResultDocument, {
            query: discoverSearchInput,
          })
          .toPromise();

        console.log(response);

        return (response.data.getIdeaSearchResult as [Idea]) || null;
      } catch (error) {
        console.error(
          `discoverSearch: Idea -> client.query() ERROR: \n${error}`
        );
        return null;
      }
    },
  }),
});

// store for discover user search result
export const discoverUserSearchResultState = atomFamily<
  [User] | null,
  string | null
>({
  key: "discoverUserSearchResultState",
  // set discover search result based on discover search input
  default: selectorFamily({
    key: "discoverUserSearchResultState/Default",
    get: (discoverSearchInput) => async () => {
      try {
        if (discoverSearchInput === "") return null;

        const response = await client
          .query(GetUserSearchResultDocument, {
            query: discoverSearchInput,
          })
          .toPromise();

        console.log(response);

        return (response.data.getUserSearchResult as [User]) || null;
      } catch (error) {
        console.error(
          `discoverSearch: User -> client.query() ERROR: \n${error}`
        );
        return null;
      }
    },
  }),
});
