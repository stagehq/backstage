import { Label, User } from "../../graphql/types.generated";

import { atom } from "recoil";

export type FilterType = "trending" | "newest" | "latest" | null;

export const urlFilterState = atom<FilterType>({
  key: "urlFilterState",
  default: null,
});

export const filterState = atom<FilterType>({
  key: "filterState",
  default: urlFilterState,
});

export const labelSelectState = atom<Label | null>({
  key: "labelSelectState",
  default: null,
});

export const userSelectState = atom<User | null>({
  key: "userSelectState",
  default: null,
});

export const filterActiveState = atom<boolean>({
  key: "filterActiveState",
  default: false,
});
