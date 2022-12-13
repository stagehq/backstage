// onboarding storeimport { atom } from "recoil";
import { atom } from "recoil";
import { publishingOption, publishingOptions } from "../../components/PublishingDropdown";

// recoil publishingState atom
export const publishingState = atom<publishingOption>({
  key: "publishingState",
  default: {
    key: "published",
    title: "Published",
    description: "Everyone can find this page.",
  },
});
