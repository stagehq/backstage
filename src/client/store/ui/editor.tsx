import { atom } from "recoil";

export const editorFormatBarState = atom<boolean>({
  key: "editorFormatBarState",
  default: true,
});

export const editorMarkdownState = atom<boolean>({
  key: "editorMarkdownState",
  default: false,
});
