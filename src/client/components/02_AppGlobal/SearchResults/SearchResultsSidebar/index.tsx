import clsx from "clsx";
import React, { FC } from "react";
import { SearchResultsSidebarNavigationItem } from "..";

interface SearchResultsSidebarProps {
  navigation: SearchResultsSidebarNavigationItem[];
  activeSearchResultSection: string;
  setActiveSearchResultSection: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResultsSidebar: FC<SearchResultsSidebarProps> = ({
  navigation,
  activeSearchResultSection,
  setActiveSearchResultSection,
}) => {
  return (
    <div className="flex flex-grow flex-col overflow-y-auto pt-5">
      <div className="mt-5 flex flex-1 flex-col">
        <nav className="flex-1 space-y-1">
          {navigation.map((item: SearchResultsSidebarNavigationItem) => (
            <div
              key={item.title}
              onClick={() => setActiveSearchResultSection(item.title)}
              className={clsx(
                "flex px-2 py-2 rounded-md text-sm font-medium hover:cursor-default",
                item.title === activeSearchResultSection
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {/* @ts-ignore */}
              <div className="flex flex-grow justify-start items-center">
                <item.icon />
                <span>{item.title} </span>
                <span className="ml-auto mr-2">{item.count}</span>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SearchResultsSidebar;
