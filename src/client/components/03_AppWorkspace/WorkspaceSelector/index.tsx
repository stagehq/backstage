import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Project } from "@prisma/client";
import clsx from "clsx";
import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { projectSlugState } from "../../../store/project";
import { currentUserState } from "../../../store/user";

const WorkspaceSelector: FC = () => {
  const navigate = useNavigate();

  const [projectSlug, setProjectSlug] = useRecoilState(projectSlugState);

  // Users projects
  const [projects, setProjects] = useState<Project[] | []>([]);

  // Current user
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  /* Set projects */
  useEffect(() => {
    if (currentUser !== null) {
      // map projects to array
      const userProjects = currentUser.userProjectRelations?.map(
        (project) => project.project as Project
      );
      // filter userProjects for active projects
      const activeProjects = userProjects?.filter(
        (project) => project.active === true
      );
      // set projects
      setProjects(activeProjects ? activeProjects : []);
    }
  }, [currentUser]);

  const handleWorkspaceChange = (value: string) => {
    navigate(`/s/workspace/${value}`);
  };

  return (
    <Listbox
      value={projectSlug ? projectSlug : null}
      onChange={handleWorkspaceChange}
    >
      {({ open }) => (
        <>
          <div className="relative flex-1">
            <Listbox.Button className="relative w-full border border-white hover:border-gray-300 rounded-md box-border pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate text-base font-semibold">
                {projectSlug
                  ? projects.find((project) => project.slug === projectSlug)
                      ?.name
                  : "Loading..."}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {projects
                  ? projects.map((project) => (
                      <Listbox.Option
                        key={project.slug}
                        className={({ active }) =>
                          clsx(
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-8 pr-4"
                          )
                        }
                        value={project.slug}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={clsx(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {project.name}
                            </span>

                            {selected ? (
                              <span
                                className={clsx(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  : null}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default WorkspaceSelector;
