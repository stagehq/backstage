"use client";

import clsx from "clsx";
import { FC, useState } from "react";

export interface DiscoverTab {
  name: string;
}

interface CategoriesProps {
  tabs: DiscoverTab[];
}

const Categories: FC<CategoriesProps> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState<DiscoverTab>(tabs[0]);

  const handleTabClick = (tab: DiscoverTab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-10 w-full flex justify-center">
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            defaultValue={currentTab.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={clsx(
                  currentTab === tab
                    ? "border border-indigo-100 bg-indigo-100 text-indigo-700"
                    : "border border-gray-300 text-gray-600  hover:text-gray-700 hover:outline hover:outline-indigo-700",
                  "px-4 py-2 font-medium text-sm rounded-full cursor-pointer"
                )}
                aria-current={currentTab === tab ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Categories;
