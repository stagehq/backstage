import { StoreExtension } from "../../../graphql/types.generated"

export const filterArray = (storeExtensions: StoreExtension[], search: string) => {
  return storeExtensions.filter((x) => x.name?.toLowerCase().includes(search.toLowerCase()));
}

export const getApiNameOfExtension = (storeExtension: StoreExtension) => {
  if(storeExtension.routes?.[0]?.apiConnector?.name == null) return null;
  return storeExtension.routes[0].apiConnector.name;
}