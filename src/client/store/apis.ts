import { atomFamily } from "recoil";
import wretch from "wretch";

export const apiState = atomFamily({
  key: "api",
  default: async (apiConnectorId: string) => {
    const response = await wretch(`/api/extension/${apiConnectorId}`)
      .get()
      .json();
    return response;
  },
});
