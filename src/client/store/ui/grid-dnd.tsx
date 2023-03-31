import { Layouts } from "react-grid-layout";
import { atom } from "recoil";

export const gridLayoutState = atom<Layouts | null>({
  key: "gridLayoutState",
  default: null,
});

export const gridBreakpointState = atom<"sm" | "lg">({
  key: "gridBreakpointState",
  default: "sm",
});
