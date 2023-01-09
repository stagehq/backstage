import { atom } from "recoil";

export const settingsOpenState = atom<boolean>({
  key: "settingsOpenState",
  default: false,
});

export const siteSettingsOpenState = atom<boolean>({
  key: "siteSettingsOpenState",
  default: false,
});

export const analyticsOpenState = atom<boolean>({
  key: "analyticsOpenState",
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

export const storeOpenState = atom<boolean>({
  key: "storeOpenState",
  default: false,
});
