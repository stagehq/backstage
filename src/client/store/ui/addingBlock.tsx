import { atom } from "recoil";

type addingState = "unadded" | "added" | "loading";

// recoil publishingState atom
export const addingInProcessState = atom<addingState>({
  key: "addingInProcessState",
  default: "unadded",
});
