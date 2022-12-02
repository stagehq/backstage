/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon } from "@heroicons/react/solid";
import { FC } from "react";
import Link from "next/link";

//@ts-ignore
const IdeaBreadcrumb = ({ match }) => <span>#{match.params.ideaId}</span>;

/* For breadcrumbs */
export const routes = [
  { path: "/app/profile", breadcrumb: "Profile" },
  { path: "/app/profile/:profileId", breadcrumb: "Profile" },
  { path: "/app/discover", breadcrumb: "Discover" },
  { path: "/app/workspace/:workspaceId", breadcrumb: "Overview" },
  { path: "/app/workspace/:workspaceId/ideas", breadcrumb: "Ideas" },
  { path: "/app/workspace/:workspaceId/ideas/new", breadcrumb: "New" },
  {
    path: "/app/workspace/:workspaceId/ideas/:ideaId",
    breadcrumb: IdeaBreadcrumb,
  },
  {
    path: "/app/workspace/:workspaceId/initiatives",
    breadcrumb: "Initiatives",
  },
  {
    path: "/app/workspace/:workspaceId/initiative/:initiativeId",
    breadcrumb: "Initiative",
  },
  { path: "/app/workspace/:workspaceId/meetings", breadcrumb: "Meetings" },
  {
    path: "/app/workspace/:workspaceId/meeting/:meetingId",
    breadcrumb: "Meeting",
  },
  { path: "/app/workspace/:workspaceId/settings", breadcrumb: "Settings" },
];

const Breadcrumb: FC = () => {
  return (
    <nav className="md:flex hidden" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 pr-2">
        {/* {breadcrumbs.map(({ breadcrumb, match, key }, index) => (
          <li key={key}>
            <div className="flex items-center">
              <Link href={match.pathname}>
                <span
                  className="mr-2 text-base font-medium text-gray-500 hover:text-gray-700"
                  aria-current={match.pathname ? true : false}
                >
                  {breadcrumb}
                </span>
              </Link>
              {index < breadcrumbs.length - 1 ? (
                <ChevronRightIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
            </div>
          </li>
        ))} */}Breadcrumb
      </ol>
    </nav>
  );
};

export default Breadcrumb;
