/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from "@headlessui/react";
import {
  CollectionIcon,
  LightBulbIcon,
  PlusIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { projectSlugState } from "../../../store/project";

interface PlusButtonProps {
  setProjectCreateOpen: (value: boolean) => void;
}

export default function PlusButton({ setProjectCreateOpen }: PlusButtonProps) {
  const projectSlug = useRecoilValue(projectSlugState);

  return (
    <Menu as="div" className="flex-shrink-0 relative">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <PlusIcon
            className="-mr-2 -ml-2 h-6 w-6 sm:h-5 sm:w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                  onClick={() => setProjectCreateOpen(true)}
                >
                  <CollectionIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Create new project
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`app/workspace/${projectSlug}/ideas/new`}
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <LightBulbIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Add idea
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`app/workspace/${projectSlug}/initiatives/new`}
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <SpeakerphoneIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Add initiative
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
