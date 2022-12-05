import { FilterIcon, LightBulbIcon } from "@heroicons/react/outline";

import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { projectSlugState } from "../../../../../store/project";
import { filterActiveState } from "../../../../../store/ui/ideasFilter";
import FilterButtons from "./FilterButtons";
import LabelSelect from "./LabelSelect";
import UserSelect from "./UserSelect";

const IdeaBar: FC = () => {
  // get navigate from react router
  const navigate = useNavigate();

  // project slug state recoil
  const [projectSlug, setProjectSlug] = useRecoilState(projectSlugState);

  // filterActive state
  const [filterActive, setFilterActive] = useRecoilState(filterActiveState);

  return (
    <div className="w-full flex justify-between mb-6 px-4 md:px-0">
      <div className="flex gap-4 flex-wrap">
        {/* Sort Tabs*/}
        <FilterButtons />
        <div className="gap-2 hidden md:flex">
          {/* Filter Dropdowns */}
          <LabelSelect />
          <UserSelect />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        {/* Search Field */}
        {/* <div>
          <div className="relative rounded-md shadow-sm w-40 h-10">
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full pr-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div> */}
        {/* Filter Button for mobile */}
        <div className="items-center md:hidden flex">
          <button
            className={
              "inline-flex h-10 items-center px-4 py-2 rounded-md border text-gray-700 border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 " +
              (filterActive
                ? "bg-indigo-50 text-indigo-800 hover:bg-indigo-50 hover:text-indigo-800"
                : "text-gray-700")
            }
            onClick={() => setFilterActive(!filterActive)}
          >
            <FilterIcon
              className="h-5 w-5"
              aria-hidden="true"
              stroke="currentColor"
            />
          </button>
        </div>
        {/* Create New Button */}
        <div className="relative h-10">
          <button
            onClick={() => navigate(`/s/workspace/${projectSlug}/ideas/new`)}
            type="button"
            className="inline-flex items-center px-4 py-2 h-full border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LightBulbIcon
              className="-ml-1 mr-3 h-5 w-5 hidden md:flex"
              aria-hidden="true"
            />
            New idea
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaBar;
