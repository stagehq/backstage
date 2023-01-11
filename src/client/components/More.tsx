import { FC } from "react";
import { Icon } from "./Icons";

const More: FC = () => {
  return (
    <div className="mt-4 md:mt-8 flex flex-col md:flex-row rounded-lg border border-zinc-300 bg-zinc-100 p-4 gap-4">
      <div className="flex flex-col gap-2 w-full md:w-2/3">
        <div className="flex items-center justify-start gap-2">
          <Icon name="CursorArrowRaysIcon" color="dark" size="lg" />
          <p className="text-base font-semibold text-left text-zinc-700">
            Present yourself even better
          </p>
        </div>
        <p className="text-xs font-medium text-left text-zinc-500">
          Is there a upcoming job application? A specific client? No need to
          waste time on tailoring your site by hand! Let us handle that for you.
        </p>
      </div>
      <div className="flex justify-start items-end md:justify-end w-full md:w-1/3">
        <button
          type="button"
          className="text-xs font-medium text-left text-white px-4 py-2 rounded bg-zinc-900"
        >
          Create a tailoring
        </button>
      </div>
    </div>
  );
};

export default More;
