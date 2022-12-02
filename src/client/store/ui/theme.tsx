import { atom } from "recoil";

export const themeState = atom<"light" | "dark">({
  key: "themeState",
  default: "light",
});
