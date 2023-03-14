import { AuthType } from "@prisma/client";

interface upsertExtensionType {
  userId: string;
  siteId: string;
  apiConnectorName: string;
  storeExtensionId: string;
  routes: { id: string; url: string; apiConnector: { name: string } }[];
  preferences?: { key: string; value: string }[];
  authType: AuthType;
  oAuthId?: string;
}

export const upsertExtension = async ({
  userId,
  siteId,
  apiConnectorName,
  storeExtensionId,
  routes,
  preferences,
  authType,
  oAuthId,
}: upsertExtensionType) => {
  const url =
    process.env.NEXT_PUBLIC_HOST_URL + "/api/dbInsertion/fetchAndCreate";
  // console.log(url);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      authType,
      oAuthId,
      preferences,
      userId,
      siteId,
      apiConnectorName,
      storeExtensionId,
      routes,
    }),
  }).then((response) => response.json());

  return response;
};
