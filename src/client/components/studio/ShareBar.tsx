// this is a mobile only component
import { FC } from "react";
import { useRecoilState } from "recoil";
import { publishingOpenState } from "../../store/ui/modals";
import { publishingState } from "../../store/ui/publishing";
import { publishingKeys } from "./PublishingDropdown";

import clsx from "clsx";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Icon } from "../Icons";

interface ShareBarProps {
  state: publishingKeys;
}

const ShareBar: FC<ShareBarProps> = ({ state }) => {
  const [, setPublishingOpen] = useRecoilState(publishingOpenState);
  const [publishing] = useRecoilState(publishingState);

  return (
    <div className="md:hidden h-10 flex items-center justify-between mx-4 mt-6 mb-3">
      <div
        className="flex gap-2 pl-4 pr-3 items-center h-10 border border-zinc-200 rounded-3xl"
        onClick={() => setPublishingOpen(true)}
      >
        <div
          className={clsx(
            "mr-1 w-3 h-3 rounded-md",
            publishing.title === "Published"
              ? "bg-emerald-400"
              : publishing.title === "Unlisted"
              ? "bg-transparent border-2 border-emerald-400"
              : "bg-rose-500 border-transparent"
          )}
        ></div>
        <p className="text-sm">{publishing.title}</p>
        <ChevronDownIcon
          className="h-4 w-4 ml-1 text-zinc-500"
          aria-hidden="true"
        />
      </div>
      <div className="h-10 w-10 flex items-center justify-center">
        <Icon color="dark" name="ShareIcon" />
      </div>
    </div>
  );
};

export default ShareBar;