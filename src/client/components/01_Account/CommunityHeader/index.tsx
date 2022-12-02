"use client";

import { FC } from "react";
import { useRecoilState } from "recoil";
import { discoverSearchInputState } from "../../../store/ui/discover";

const CommunityHeader: FC = () => {
  // discover search input store state
  const [discoverSearchInput, setDiscoverSearchInput] = useRecoilState(
    discoverSearchInputState
  );

  // handle discover search input change
  const handleDiscoverSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscoverSearchInput(e.target.value);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6 w-full flex flex-col items-center">
      <div className="text-center mb-5">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-4xl tracking-tight">
          There are so many opportunities
        </h2>
        <p className="mt-2 mx-auto text-xl text-gray-500 sm:mt-4">
          Open source projects out there need your help, get in touch and make a
          difference
        </p>
      </div>
      <div className="flex-1 w-2/6">
        <div className="relative flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search projects ..."
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-full"
            value={discoverSearchInput}
            onChange={handleDiscoverSearchInputChange}
          />
          <div className="absolute inset-y-0 right-2 flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
