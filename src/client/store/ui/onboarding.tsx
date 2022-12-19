// onboarding storeimport { atom } from "recoil";
import { atom } from "recoil";

export type OnboardingSection =
  | "start"
  | "profile"
  | "cv"
  | "projects"
  | "blogs"
  | "store"
  | "subdomain"
  | "done";

// recoil editLabelState atom
export const activeSectionState = atom<OnboardingSection>({
  key: "editLabelState",
  default: "start",
});
