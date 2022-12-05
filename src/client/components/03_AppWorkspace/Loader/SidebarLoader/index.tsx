"use client";

import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { navigation } from "../../SidebarNavigation";

const SidebarLoader: FC = () => {
  return (
    <div className="lg:flex flex-col min-h-0 border-r border-gray-200 bg-white w-60 hidden">
      <div className="flex-1 flex flex-col pt-3 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Listbox value="Loading..." onChange={() => true}>
            <Listbox.Button className="relative w-full border border-white hover:border-gray-300 rounded-md box-border pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate text-base font-semibold">
                Loading...
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </Listbox>
        </div>
        <nav className="mt-8 flex-1 px-4 bg-white" aria-label="Sidebar">
          {navigation.map((item) => (
            <span
              key={item.key}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
            >
              <span className="flex-1">{item.name}</span>
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarLoader;
