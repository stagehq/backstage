import clsx from "clsx";
import { FC, MouseEventHandler } from "react";
import { Label as LabelType } from "../../../graphql/types.generated";

interface LabelProps {
  label: LabelType;
  removable?: MouseEventHandler<HTMLButtonElement>;
}

export const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
  "gray",
];

const Label: FC<LabelProps> = ({ label, removable }) => {
  return (
    <span
      key={label.id}
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium whitespace-nowrap w-fit h-fit",
        { ["bg-red-100 text-red-800"]: label.color === "red" },
        { ["bg-orange-100 text-orange-800"]: label.color === "orange" },
        { ["bg-yellow-100 text-yellow-800"]: label.color === "yellow" },
        { ["bg-green-100 text-green-800"]: label.color === "green" },
        { ["bg-cyan-100 text-cyan-800"]: label.color === "cyan" },
        { ["bg-blue-100 text-blue-800"]: label.color === "blue" },
        { ["bg-purple-100 text-purple-800"]: label.color === "purple" },
        { ["bg-pink-100 text-pink-800"]: label.color === "pink" },
        { ["bg-gray-100 text-gray-800"]: label.color === "gray" },
        { ["pl-2.5 pr-1"]: removable }
      )}
    >
      {label.name}
      {removable && (
        <button
          type="button"
          onClick={removable}
          className={clsx(
            "ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:text-white focus:outline-none",
            {
              ["text-red-400 hover:bg-red-200 hover:text-red-500 focus:bg-red-500"]:
                label.color === "red",
            },
            {
              ["text-orange-400 hover:bg-orange-200 hover:text-orange-500 focus:bg-orange-500"]:
                label.color === "orange",
            },
            {
              ["text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:bg-yellow-500"]:
                label.color === "yellow",
            },
            {
              ["text-green-400 hover:bg-green-200 hover:text-green-500 focus:bg-green-500"]:
                label.color === "green",
            },
            {
              ["text-cyan-400 hover:bg-cyan-200 hover:text-cyan-500 focus:bg-cyan-500"]:
                label.color === "cyan",
            },
            {
              ["text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500"]:
                label.color === "blue",
            },
            {
              ["text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:bg-purple-500"]:
                label.color === "purple",
            },
            {
              ["text-pink-400 hover:bg-pink-200 hover:text-pink-500 focus:bg-pink-500"]:
                label.color === "pink",
            },
            {
              ["text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500"]:
                label.color === "gray",
            }
          )}
        >
          <span className="sr-only">Remove small option</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Label;
