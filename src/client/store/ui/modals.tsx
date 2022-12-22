import { atom } from "recoil";

export const settingsOpenState = atom<boolean>({
  key: "settingsOpenState",
  default: false,
});

export const soonOpenState = atom<boolean>({
  key: "soonOpenState",
  default: false,
});

export const preferencesOpenState = atom<boolean>({
  key: "preferencesOpenState",
  default: false,
});

export const publishingOpenState = atom<boolean>({
  key: "publishingOpenState",
  default: false,
});

export const projectCreateOpenState = atom<boolean>({
  key: "projectCreateOpenState",
  default: false,
});

export const labelEditModalOpenState = atom<boolean>({
  key: "labelEditModalOpenState",
  default: false,
});
