import { atom } from "recoil";

export const settingsOpenState = atom({
  key: "settingsOpenState",
  default: false,
});

export const projectCreateOpenState = atom({
  key: "projectCreateOpenState",
  default: false,
});

export const labelEditModalOpenState = atom({
  key: "labelEditModalOpenState",
  default: false,
});
