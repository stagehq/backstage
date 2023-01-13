import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const Search: FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <div className="flex w-full gap-2">
      <div className="flex flex-1 items-center justify-center ">
        <div className="w-full">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search blocks ..."
              type="search"
            />
          </div>
        </div>
      </div>
      <a
        href="https://developers.getstage.app/introduction/readme"
        className="relative flex cursor-pointer items-start justify-start gap-2 rounded-md border border-zinc-300 px-4 py-2 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
      >
        <p className="text-left text-sm font-medium">Build your own block</p>
      </a>
    </div>
  );
};
export default Search;
