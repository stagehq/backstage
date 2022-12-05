/* This example requires Tailwind CSS v2.0+ */
import { DotsVerticalIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Project } from "../../../graphql/types.generated";

interface PinnedProjectsProps {
  projects: Project[];
}

const PinnedProjects: FC<PinnedProjectsProps> = ({ projects }) => {
  if (projects) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 mb-5">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Pinned Projects
        </h2>
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {projects.map((project) => (
            <li
              key={project.name}
              className="col-span-1 flex shadow-sm rounded-md"
            >
              <div
                className={clsx(
                  "bg-indigo-500 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                )}
              >
                {/* {project.initials} */}
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link
                    to={project.slug ? "/app/workspace/" + project.slug : "#"}
                    className="text-gray-900 font-medium hover:text-gray-600"
                  >
                    {project.name}
                  </Link>
                  <p className="text-gray-500">
                    {project.contributors?.length}{" "}
                    {project.contributors
                      ? project.contributors?.length > 1
                        ? `Members`
                        : `Member`
                      : null}
                  </p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default PinnedProjects;
