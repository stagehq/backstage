/* This example requires Tailwind CSS v2.0+ */
import { faker } from "@faker-js/faker";
import { PlusIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "../../../graphql/createProject.generated";
import Spinner from "../Icons/Spinner";

export default function EmptyState() {
  /* Data Handling */
  const { data: session } = useSession();
  const [, createProject] = useCreateProjectMutation();

  /* UI States */
  const [createProjectLoading, setCreateProjectLoading] =
    useState<boolean>(false);

  /* Fake data */
  const randomProjectName = faker.vehicle.bicycle();

  /* Router */
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new project.
      </p>
      <div className="mt-6">
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
                if (slug) navigate(`/app/workspace/${slug}`);
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
  );
}
