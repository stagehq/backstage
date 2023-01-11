import { decodeGlobalID } from "@pothos/plugin-relay";
import { AuthType } from "@prisma/client";
import { Site, StoreExtension, User } from "../../../graphql/types.generated";
import { upsertExtension } from "../../helper/upsertExtension";

export const filterArray = (
  storeExtensions: StoreExtension[],
  search: string
) => {
  return storeExtensions.filter((x) =>
    x.name?.toLowerCase().includes(search.toLowerCase())
  );
};

export const getApiNameOfExtension = (storeExtension: StoreExtension) => {
  if (storeExtension.routes?.[0]?.apiConnector?.name == null) return null;
  return storeExtension.routes[0].apiConnector.name;
};

export const getAuthTypeOfExtension = (storeExtension: StoreExtension) => {
  if (storeExtension.routes?.[0]?.apiConnector?.authType == null) return null;
  return storeExtension.routes[0].apiConnector.authType as AuthType;
};

export const isExtensionPartOfSite = (
  storeExtension: StoreExtension,
  site: Site
) => {
  if (!site.extensions) return null;
  return site.extensions.some(
    (extension) => extension.storeExtension?.id === storeExtension.id
  );
};

export const addOAuthExtension = async (apiName: string | null, storeExtension: StoreExtension, site: Site | null, user: User) => {
  const serviceModule = await import("../../../api/service/" + apiName);
  //authorize
  await serviceModule.authorize();
  //create extension
  if (!serviceModule.getTokens()?.isExpired()) {
    if (!site || !user || !storeExtension || !storeExtension.routes || !apiName) return;
    await upsertExtension({
      siteId: decodeGlobalID(site.id).id,
      storeExtensionId: decodeGlobalID(storeExtension.id).id,
      userId: decodeGlobalID(user.id).id,
      routes: storeExtension.routes.map((route) => {
        return {
          id: decodeGlobalID(route.id).id,
          url: route.url ? route.url : "",
          apiConnector: {
            name: route.apiConnector?.name ? route.apiConnector.name : "",
          },
        };
      }),
      oAuthId: serviceModule.getTokens()?.idToken,
      authType: AuthType.oAuth,
      apiConnectorName: apiName,
    });
  }
}