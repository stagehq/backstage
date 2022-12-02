import { atom } from "recoil";
import { Label } from "../../graphql/types.generated";

// recoil editLabelState atom
export const editLabelState = atom<Label | null>({
  key: "editLabelState",
  default: null,
});

// recoil selectedLabelState atom
export const selectedLabelState = atom<Label[]>({
  key: "selectedLabelState",
  default: [],
});
