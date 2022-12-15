// write onboarding store with recoil which takes firstname, lastname, tagline, bio

import { atom } from "recoil";

interface OnboardingProps {
  tagline: string;
  bio: string;
  subdomain: string;
  linkedinUrl: string;
  // add more props here for onboarding
}

// create onboarding state
export const onboardingState = atom<OnboardingProps>({
  key: "onboardingState",
  default: {
    tagline: "",
    bio: "",
    subdomain: "",
    linkedinUrl: "",
  },
});
