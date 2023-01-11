import { Layouts } from "react-grid-layout";
import { atom } from "recoil";

export const gridLayoutState = atom<Layouts>({
  key: "gridLayoutState",
  default: {
    sm: [
      { i: "a", x: 0, y: 1, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
      { i: "b", x: 2, y: 0, w: 1, h: 100 / 24, minW: 1, maxW: 3 },
      { i: "c", x: 0, y: 2, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
    ],
    md: [
      { i: "a", x: 0, y: 1, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
      { i: "b", x: 2, y: 0, w: 1, h: 100 / 24, minW: 1, maxW: 3 },
      { i: "c", x: 0, y: 2, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
    ],
    lg: [
      { i: "a", x: 0, y: 1, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
      { i: "b", x: 0, y: 0, w: 1, h: 100 / 24, minW: 1, maxW: 3 },
      { i: "c", x: 0, y: 2, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
    ],
  },
});

export const gridBreakpointState = atom<string>({
  key: "gridBreakpointState",
  default: "lg",
});
