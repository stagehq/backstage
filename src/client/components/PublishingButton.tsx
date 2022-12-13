import { FC } from "react";

interface PublishingButtonProps {
  state: "unpublished" | "unlisted" | "published";
}

const PublishingButton: FC<PublishingButtonProps> = ({ state }) => {
  switch (state) {
    case "published":
      return (
        <div className="flex items-center gap-2 text-zinc-700 border border-zinc-200 px-4 h-8 rounded-2xl hover:bg-zinc-100 cursor-pointer">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-md"></div>
          <p className="text-sm">published</p>
        </div>
      );
    case "unlisted":
      return (
        <div className="flex items-center gap-2 text-zinc-700 border border-zinc-200 px-4 h-8 rounded-2xl hover:bg-zinc-100 cursor-pointer">
          <div className="w-2.5 h-2.5 border-2 border-emerald-400 rounded-md"></div>
          <p className="text-sm">unlisted</p>
        </div>
      );
    case "unpublished":
      return (
        <div className="flex items-center gap-2 text-zinc-700 border border-zinc-200 px-4 h-8 rounded-2xl hover:bg-zinc-100 cursor-pointer">
          <div className="w-2.5 h-2.5 bg-rose-500 rounded-md"></div>
          <p className="text-sm">offline</p>
        </div>
      );
  }
};

export default PublishingButton;
