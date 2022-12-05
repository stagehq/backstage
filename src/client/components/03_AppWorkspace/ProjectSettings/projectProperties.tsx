import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectSlugState, projectState } from "../../../store/project";

import { ExclamationCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import slug from "slug";
import { Project } from "../../../graphql/types.generated";
import { useUpdateProjectMutation } from "../../../graphql/updateProject.generated";
import Spinner from "../../02_AppGlobal/Icons/Spinner";
import { SlugField } from "./slugField";

const ProjectProperties: FC = () => {
  /* data handling */
  const { data: session } = useSession();
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [oldProject, setOldProject] = useState<Project | null>(null);
  const [, updateProject] = useUpdateProjectMutation();

  /* UI states */
  const [fieldsEdited, setFieldsEdited] = useState(false);
  const [updateProjectLoading, setUpdateProjectLoading] = useState(false);

  const maxCharacter = 24;
  const minCharacter = 3;

  /* handler */
  const handleChangeName = (name: string) => {
    if (project) {
      setProject({
        ...project,
        name: name,
        slug: slug(name),
      });
      setFieldsEdited(true);
    }
  };

  /* Router */
  const navigate = useNavigate();

  useEffect(() => {
    // initialize old project for restore on reset button
    if (oldProject === null) {
      setOldProject(project);
    }
  }, [project, oldProject]);

  /* Field */
  const [fieldValue, setFieldValue] = useState<string>("");

  /* Checks */
  const [maxCharExeeded, setMaxCharExeeded] = useState<boolean>(false);
  const [minCharBelow, setMinCharBelow] = useState<boolean>(false);

  /* Generel Check*/
  const [check, setCheck] = useState<boolean>(false);

  /* Make the individual checks */
  useEffect(() => {
    if (project?.name) {
      project.name.length >= maxCharacter
        ? setMaxCharExeeded(true)
        : setMaxCharExeeded(false);
      project.name.length <= minCharacter
        ? setMinCharBelow(true)
        : setMinCharBelow(false);
    } else {
      setMaxCharExeeded(false);
      setMinCharBelow(true);
    }
  }, [project]);

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <div>
          <label
            htmlFor="project-name"
            className="block text-sm font-medium text-gray-700"
          >
            Project name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="project-name"
              id="project-name"
              value={project?.name || ""}
              className={clsx(
                "block w-full pr-10 sm:text-sm rounded-md focus:outline-none placeholder-grey-300",
                maxCharExeeded || minCharBelow
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
                  : "border-gray-300 text-grey-900 focus:ring-grey-500 focus:border-grey-500"
              )}
              placeholder="Enter your project name ..."
              aria-invalid="true"
              aria-describedby={name + "-error"}
              onChange={(event) => handleChangeName(event.target.value)}
            />
            {(maxCharExeeded || minCharBelow) && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className={clsx(
                    "h-5 w-5",
                    maxCharExeeded || minCharBelow
                      ? "text-red-500"
                      : "text-black"
                  )}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          {maxCharExeeded && (
            <p
              className="mt-2 text-sm text-black opacity-50"
              id={name + "-error"}
            >
              {"Your project name must be less than " +
                maxCharacter +
                " characters."}
            </p>
          )}
          {minCharBelow && (
            <p
              className="mt-2 text-sm text-black opacity-50"
              id={name + "-error"}
            >
              {"Your project name must be more than " +
                minCharacter +
                " characters."}
            </p>
          )}
        </div>
      </div>
      <div className="sm:col-span-2">
        <SlugField
          value={slug(project?.name ? project.name : "")}
          label="Slug"
          name="projectSlug"
        />
      </div>
      {fieldsEdited && session?.user?.email ? (
        <div className="sm:col-span-6 px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              console.log(oldProject);
              setProject(oldProject);
              setFieldsEdited(false);
            }}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              if (minCharBelow || maxCharExeeded) {
                toast.error(
                  "Your project name must be between 3 and 24 characters."
                );
                return false;
              }
              setUpdateProjectLoading(true);
              if (session?.user?.email) {
                toast
                  .promise(
                    updateProject({
                      name: project?.name,
                      slug: project?.slug,
                    }),
                    {
                      loading: `Change project Name ...`,
                      success: `Successfully changed!`,
                      error: (err) => err,
                    }
                  )
                  .then((result) => {
                    setUpdateProjectLoading(false);
                    setFieldsEdited(false);
                    //TODO: fix navigation to new project
                    navigate(
                      `/s/workspace/${result.data?.updateProject?.slug}`
                    );
                  });
              }
            }}
            className="bg-blue-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
          >
            {updateProjectLoading ? <Spinner color={"text-white"} /> : null}
            Save
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { ProjectProperties };
