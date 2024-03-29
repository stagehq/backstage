import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { dashboardQueryState } from "../store/ui/dashboardSearch";
import { subdomainCardOpenState } from "../store/ui/modals";
import { currentUserState } from "../store/user";

const ListHeader = () => {
  const [, setQuery] = useRecoilState(dashboardQueryState);
  const [, setSubdomainCardOpen] = useRecoilState(subdomainCardOpenState);
  const user = useRecoilValue(currentUserState);

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
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        disabled={user?.sites && user.sites.length >= 1 ? true : false}
        className="inline-flex w-fit justify-center rounded-md border border-transparent bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 disabled:opacity-30 sm:w-auto sm:text-sm"
        onClick={() => setSubdomainCardOpen(true)}
      >
        Create site
      </button>
    </div>
  );
};
export default ListHeader;
