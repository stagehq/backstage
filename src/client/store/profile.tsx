import { atom, atomFamily, selectorFamily } from "recoil";

import { client } from "../graphql/client";
import { GetUserDocument } from "../graphql/getUser.generated";
import { User } from "../graphql/types.generated";

// set user alias for fetching user data
export const userAliasState = atom<string | null>({
  key: "userAliasState",
  default: null,
});

// set user data in the store
export const userState = atomFamily<User | null, string | null>({
  key: "userState",
  default: selectorFamily({
    key: "userState/Default",
    get: (userAlias) => async () => {
      try {
        if (userAlias === null) return null;

        const response = await client
          .query(GetUserDocument, {
            alias: userAlias,
          })
          .toPromise();

        return (response.data.user as User) || null;
      } catch (error) {
        console.error(`userFetch -> client.query() ERROR: \n${error}`);
        return null;
      }
    },
  }),
});
