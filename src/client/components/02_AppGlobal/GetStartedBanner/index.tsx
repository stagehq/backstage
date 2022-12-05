import { PlusIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { projectCreateOpenState } from "../../../store/ui/modals";

const GetStartedBanner: FC = () => {
  // projectCreateModal state
  const [projectCreateOpen, setProjectCreateOpen] = useRecoilState<boolean>(
    projectCreateOpenState
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <div className="bg-indigo-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div className="flex items-center px-4 py-6">
            <div className="flex flex-col items-center lg:items-start lg:justify-start ml-3  text-white truncate">
              <span className="text-xl font-medium m-2 lg:m-0 lg:mb-2 lg:text-lg">
                Get started with your first project 🎉
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setProjectCreateOpen(true)}
                  className="mt-2 inline-flex bg-white border border-transparent rounded-md shadow-sm py-2 px-4 justify-center text-sm font-medium text-indigo-700 hover:bg-white"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Create project
                </button>
                <span className="flex items-center justify-center text-sm font-medium text-white mt-2 py-2">
                  or
                </span>
                <button className="mt-2 flex items-center justify-center py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white underline-offset-2 underline">
                  Search the community
                </button>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/images/app/get-started.png"
              alt="Get started"
              className="relative px-6 -bottom-6 w-[40rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedBanner;
