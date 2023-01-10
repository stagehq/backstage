import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ListHeader = () => {
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
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-zinc-800 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:text-sm"
              placeholder="Search sites ..."
              type="search"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-start items-start relative gap-2 px-4 py-2 rounded-md border shadow border-zinc-200 bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-zinc-100">
        <p className="text-sm font-medium text-left">Create site</p>
      </div>
    </div>
  );
};
export default ListHeader;
