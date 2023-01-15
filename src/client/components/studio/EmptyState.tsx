import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { storeOpenState } from "../../store/ui/modals";
import { themeState } from "../../store/ui/theme";

const EmptyState = () => {
  /* Store modal state */
  const [, setStoreOpen] = useRecoilState(storeOpenState);
  const [theme] = useRecoilState(themeState);

  return (
    <div className="p-8">
      <div className="w-full rounded-2xl bg-gradient-to-b from-zinc-400 to-white p-[1px] dark:from-zinc-500 dark:to-zinc-900">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-white py-16 @container dark:bg-zinc-900">
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="43"
              fill="none"
              viewBox="0 0 43 43"
            >
              <rect
                width="35"
                height="35"
                x="7"
                y="7"
                stroke={theme === "light" ? "#000" : "#AAA"}
                strokeWidth="2"
                rx="3"
              ></rect>
              <rect
                width="35"
                height="35"
                x="1"
                y="1"
                fill={theme === "light" ? "#FFF" : "#27272A"}
                stroke={theme === "light" ? "#000" : "#AAA"}
                strokeWidth="2"
                rx="3"
              ></rect>
              <rect
                width="25"
                height="5"
                x="6"
                y="5"
                fill={theme === "light" ? "#D3D0D0" : "#666"}
                rx="2.5"
              ></rect>
            </svg>
          </div>
          <div className="flex w-full flex-col gap-2 @md:w-80">
            <p className="text-center text-lg font-semibold text-zinc-900 dark:text-zinc-200">
              No blocks added yet.
            </p>
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              To integrate data from other platforms you have to connect an API
              with our Block ecosystem.
            </p>
          </div>
          <button 
            onClick={() => setStoreOpen(true)}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-900 dark:bg-zinc-800 px-4 py-2 text-zinc-100 dark:text-zinc-300 shadow hover:bg-zinc-800 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 dark:focus:ring-zinc-300 focus:outline-none dark:focus:ring-offset-zinc-900"
          >
            <PlusSmallIcon className="w-5 h-5"/>
            <p className="text-left text-sm font-medium">
              Add a block
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
