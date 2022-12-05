import {
  SparklesIcon,
  TemplateIcon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { FC, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Idea, Project, User } from "../../../graphql/types.generated";
import {
  discoverIdeaSearchResultState,
  discoverProjectSearchResultState,
  discoverSearchInputState,
  discoverUserSearchResultState,
} from "../../../store/ui/discover";
import IdeaSearchResults from "./IdeaSearchResults";
import ProjectSearchResults from "./ProjectSearchResults";
import SearchResultsSidebar from "./SearchResultsSidebar";
import UserSearchResults from "./UserSearchResults";

export type SearchResultsSidebarNavigationItem = {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  count: number | null | undefined;
};

const SearchResults: FC = () => {
  // discover search result store state
  const discoverSearchInput = useRecoilValue(discoverSearchInputState);
  // search result recoil state
  const [discoverSearchResult] = useRecoilState(
    discoverProjectSearchResultState(discoverSearchInput)
  );
  // idea searc hresult state
  const [ideaSearchResult] = useRecoilState(
    discoverIdeaSearchResultState(discoverSearchInput)
  );
  // user search result state
  const [userSearchResult] = useRecoilState(
    discoverUserSearchResultState(discoverSearchInput)
  );

  const countAllSearchResults = () => {
    let count = 0;
    if (discoverSearchResult) {
      count += discoverSearchResult.length;
    }
    if (ideaSearchResult) {
      count += ideaSearchResult.length;
    }
    if (userSearchResult) {
      count += userSearchResult.length;
    }
    return count;
  };

  const navigation = [
    {
      title: "All",
      count: countAllSearchResults(),
      icon: () => (
        <ViewGridIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-600"
          aria-hidden="true"
        />
      ),
    },
    {
      title: "Projects",
      count: discoverSearchResult?.length,
      icon: () => (
        <TemplateIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-600"
          aria-hidden="true"
        />
      ),
    },
    {
      title: "Ideas",
      count: ideaSearchResult?.length,
      icon: () => (
        <SparklesIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-600"
          aria-hidden="true"
        />
      ),
    },
    {
      title: "Users",
      count: userSearchResult?.length,
      icon: () => (
        <UserIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-600"
          aria-hidden="true"
        />
      ),
    },
  ];

  const [activeSearchResultSection, setActiveSearchResultSection] = useState(
    navigation[0].title
  );

  const valid = (item: [Project] | [Idea] | [User] | null) => {
    return Array.isArray(item) && item.length ? true : false;
  };

  return (
    <div>
      {/* search result headline */}
      {discoverSearchInput && (
        <div className="px-4 sm:px-6 lg:px-8">
          <p className="text-md font-normal text-gray-900">
            Results for{" "}
            <span className="font-semibold">{discoverSearchInput}</span>
          </p>
        </div>
      )}
      <div className="px-4 sm:px-6 lg:px-8 mb-5">
        {/* Static sidebar for desktop */}
        <div className="flex">
          <div className="hidden md:flex md:w-64 md:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <SearchResultsSidebar
              {...{
                navigation,
                activeSearchResultSection,
                setActiveSearchResultSection,
              }}
            />
          </div>
          <div className="w-full">
            {/* Search results */}
            {valid(discoverSearchResult) &&
              (activeSearchResultSection === "All" ||
                activeSearchResultSection === "Projects") && (
                <ProjectSearchResults {...{ discoverSearchResult }} />
              )}
            {valid(ideaSearchResult) &&
              (activeSearchResultSection === "All" ||
                activeSearchResultSection === "Ideas") && (
                <IdeaSearchResults {...{ ideaSearchResult }} />
              )}
            {valid(userSearchResult) &&
              (activeSearchResultSection === "All" ||
                activeSearchResultSection === "Users") && (
                <UserSearchResults {...{ userSearchResult }} />
              )}
            {discoverSearchInput && countAllSearchResults() === 0 ? (
              <div className="px-4 sm:px-6 lg:px-8 mb-8 mt-8">
                <div className="text-center">
                  <p className="text-md font-semibold text-gray-900 sm:text-md tracking-tight">
                    No results found
                  </p>
                  <p className="mt-1 mx-auto text-sm text-gray-500 sm:mt-1">
                    Try searching for something else.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
