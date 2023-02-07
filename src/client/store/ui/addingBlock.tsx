import { atom } from "recoil";

export type addingState = "unadded" | "added" | "loading";

// recoil publishingState atom
export const addingInProcessState = atom<addingState>({
  key: "addingInProcessState",
  default: "unadded",
});
