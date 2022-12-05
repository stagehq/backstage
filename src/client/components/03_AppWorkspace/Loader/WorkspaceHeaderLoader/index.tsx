"use client";

import { Disclosure, Menu } from "@headlessui/react";
import { GlobeIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

interface WorkspaceHeaderLoaderProps {
  target: "WorkspaceHeader" | "InAppHeader";
}

const WorkspaceHeaderLoader: FC<WorkspaceHeaderLoaderProps> = ({ target }) => {
  return (
    <Disclosure
      as="header"
      className={clsx(
        "bg-transparent",
        target === "WorkspaceHeader" && "border-b border-gray-200"
      )}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 lg:px-0 hidden md:flex"></div>
              <div className="relative z-10 flex-1 px-2 flex items-center justify-center xl:inset-0 gap-3">
                <div className="w-full md:max-w-xs"></div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <div className="flex gap-2">
                  <Link href="/discover">
                    <button
                      type="button"
                      className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <GlobeIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </Link>
                  {/* <button
                    type="button"
                    className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <InboxIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="flex-shrink-0 relative ml-4">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <div className="rounded-full text-gray-400 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default WorkspaceHeaderLoader;
