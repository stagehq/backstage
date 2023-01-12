import { atom } from "recoil";

export const dashboardQueryState = atom<string>({
  key: "dashboardQueryState",
  default: "",
});
