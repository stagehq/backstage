import { StoreExtension } from "../../graphql/types.generated";

export const createExtensionOnSite = (storeExtension: StoreExtension) => {
  // map over storeExtension.routes.apiConnector and find duplicates
  const apiConnectors = storeExtension.routes?.map(
    (route) => route.apiConnector
  );
  // remove duplicates
  const uniqueApiConnectors = [...new Set(apiConnectors)];
  console.log(uniqueApiConnectors);
  // open modal to select which apiConnector to use
};
