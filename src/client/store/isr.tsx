import { atom } from "recoil";
import { Site } from "../graphql/types.generated";

export const isrState = atom<boolean>({
  key: "isrState",
  default: false,
});

export const isrDataState = atom<Site | null>({
  key: "isrDataState",
  default: null,
});
