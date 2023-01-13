import { FC } from "react";
import { Icon } from "./Icons";

const More: FC = () => {
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-lg border border-zinc-300 bg-zinc-100 p-4 md:mt-8 md:flex-row">
      <div className="flex w-full flex-col gap-2 md:w-2/3">
        <div className="flex items-center justify-start gap-2">
          <Icon name="CursorArrowRaysIcon" color="dark" size="lg" />
          <p className="text-left text-base font-semibold text-zinc-700">
            Present yourself even better
          </p>
        </div>
        <p className="text-left text-xs font-medium text-zinc-500">
          Is there a upcoming job application? A specific client? No need to
          waste time on tailoring your site by hand! Let us handle that for you.
        </p>
      </div>
      <div className="flex w-full items-end justify-start md:w-1/3 md:justify-end">
        <button
          type="button"
          className="rounded bg-zinc-900 px-4 py-2 text-left text-xs font-medium text-white"
        >
          Create a tailoring
        </button>
      </div>
    </div>
  );
};

export default More;
