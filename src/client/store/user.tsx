import { atom, selector } from "recoil";

import { client } from "../graphql/client";
import { GetCurrentUserDocument } from "../graphql/getCurrentUser.generated";
import { User } from "../graphql/types.generated";

// fetch user data from the server
export const currentUserFetch = selector<User | null>({
  key: "currentUserFetch",
  get: async ({ get }) => {
    try {
      const response = await client.query(GetCurrentUserDocument, {}).toPromise();
      return (response.data.currentUser as User) || null;
    } catch (error) {
      console.error(`currentUserFetch -> client.query() ERROR: \n${error}`);
      return null;
    }
  },
});

// set user data in the store
export const currentUserState = atom<User | null>({
  key: "currentUserState",
  default: currentUserFetch,
});
