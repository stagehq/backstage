import { FC, useState } from "react";

import faker from "@faker-js/faker";
import { PlusIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "../../../graphql/createProject.generated";
import { Project } from "../../../graphql/types.generated";
import Spinner from "../../02_AppGlobal/Icons/Spinner";

interface ProjectListingProps {
  projects: Project[];
}

const ProjectListing: FC<ProjectListingProps> = ({ projects }) => {
  const { data: session } = useSession();
  const navigate = useNavigate();

  const [, createProject] = useCreateProjectMutation();

  /* UI States */
  const [createProjectLoading, setCreateProjectLoading] =
    useState<boolean>(false);

  /* Fake data */
  const randomProjectName = faker.vehicle.bicycle();

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {/* <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the projects in your account.
          </p> */}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setCreateProjectLoading(true);
              if (session?.user?.email) {
                createProject({
                  name: randomProjectName,
                }).then((result) => {
                  setCreateProjectLoading(false);
                  const slug = result.data?.createProject?.slug;
                  if (slug) navigate(`/s/workspace/${slug}`);
                });
              }
            }}
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {createProjectLoading ? (
              <Spinner color={"text-white"} />
            ) : (
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            )}
            Create Project
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Slug
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.name}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      {project.name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {project.slug}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {project.id}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                      <Link
                        to={`/s/workspace/${project.slug}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                        <span className="sr-only">, {project.name}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListing;
