import {
  ChatAlt2Icon,
  ClockIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  filterState,
  FilterType,
  urlFilterState,
} from "../../../../../../store/ui/ideasFilter";

const FilterButtons: FC = () => {
  // get search params from react router
  const [searchParams, setSearchParams] = useSearchParams();

  // get filter type from search params
  const urlFilter = searchParams.get("filter") as FilterType;

  // recoil state for url filter
  const [urlFilterValue, setUrlValueFilter] = useRecoilState(urlFilterState);
  const [filter, setFilter] = useRecoilState(filterState);

  // handle filter change
  const handleFilterChange = (selectedFilter: FilterType) => {
    if (filter === selectedFilter) {
      setSearchParams({});
      setUrlValueFilter(null);
      return setFilter(null);
    }
    setSearchParams({ filter: selectedFilter as string });
    return setFilter(selectedFilter);
  };

  // useeffect on mount if filter is set
  useEffect(() => {
    if (urlFilter) {
      setUrlValueFilter(urlFilterValue);
      setFilter(urlFilter);
    }
    if (filter) {
      setSearchParams({ filter: filter });
    }
  }, []);

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md h-10">
      <button
        onClick={() => handleFilterChange("trending")}
        type="button"
        className={
          "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 " +
          (filter === "trending"
            ? "bg-indigo-50 text-indigo-800 hover:bg-indigo-50 hover:text-indigo-800"
            : "text-gray-700")
        }
      >
        <TrendingUpIcon
          className="xl:-ml-1 xl:mr-3 h-5 w-5"
          aria-hidden="true"
        />
        <span className="hidden xl:block">Trending</span>
      </button>
      <button
        onClick={() => handleFilterChange("newest")}
        type="button"
        className={
          "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 " +
          (filter === "newest"
            ? "bg-indigo-50 text-indigo-800 hover:bg-indigo-50 hover:text-indigo-800"
            : "text-gray-700")
        }
      >
        <ClockIcon className="xl:-ml-1 xl:mr-3 h-5 w-5" aria-hidden="true" />
        <span className="hidden xl:block">Newest</span>
      </button>
      <button
        onClick={() => handleFilterChange("latest")}
        type="button"
        className={clsx(
          "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",
          filter === "latest"
            ? "bg-indigo-50 text-indigo-800 hover:bg-indigo-50 hover:text-indigo-800"
            : "text-gray-700"
        )}
      >
        <ChatAlt2Icon className="xl:-ml-1 xl:mr-3 h-5 w-5" aria-hidden="true" />
        <span className="hidden xl:block">Last updated</span>
      </button>
    </span>
  );
};

export default FilterButtons;
