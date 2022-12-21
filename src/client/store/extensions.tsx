// fetch store extensions and create atom for it

import { atom, selector } from "recoil";
import { client } from "../graphql/client";
import { GetStoreExtensionsDocument } from "../graphql/getStoreExtensions.generated";
import { StoreExtension } from "../graphql/types.generated";

const storeExtensionSelector = selector({
  key: "storeExtensionSelector",
  get: async () => {
    try {
      const response = await client
        .query(GetStoreExtensionsDocument)
        .toPromise();
      //console.log(response.data.getStoreExtensions);
      return (response.data.getStoreExtensions as StoreExtension[]) || null;
    } catch (error) {
      console.error(`getStoreExtensions -> client.query() ERROR: \n${error}`);
      return null;
    }
  },
});

export const storeExtensionState = atom({
  key: "storeExtensionState",
  default: storeExtensionSelector,
});