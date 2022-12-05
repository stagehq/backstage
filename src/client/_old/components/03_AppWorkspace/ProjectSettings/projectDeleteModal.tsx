import { Dialog, Transition } from "@headlessui/react";
/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useEffect, useRef, useState } from "react";

import { ExclamationIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Project } from "../../../../graphql/types.generated";
import { useUpdateProjectActiveStateMutation } from "../../../../graphql/updateProjectActiveState.generated";
import { currentUserState } from "../../../../store/user";
import Spinner from "../../02_AppGlobal/Icons/Spinner";

interface ProjectDeleteModalProps {
  deleterModalOpen: boolean;
  setDeleterModalOpen: (value: boolean) => void;
  project: Project | null;
}

const ProjectDeleteModal: FC<ProjectDeleteModalProps> = ({
  deleterModalOpen,
  setDeleterModalOpen,
  project,
}) => {
  /* UI states */
  const [open, setOpen] = useState<boolean>(false);
  const [updateProjectLoading, setUpdateProjectLoading] =
    useState<boolean>(false);

  /* data handling */
  const { data: session } = useSession();
  const [, updateProjectActiveState] = useUpdateProjectActiveStateMutation();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const cancelButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(deleterModalOpen);
  }, [deleterModalOpen]);

  const handleClose = () => {
    setOpen(false);
    setDeleterModalOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => handleClose()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Are you sure to deactivate{" "}
                        <span className="text-gray-600">{project?.name}</span> ?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your project will be deactivated for 30 days.
                        </p>
                        <p className="text-sm text-gray-500">
                          During this time you can still recover your project.
                        </p>
                        <p className="text-sm text-gray-500">
                          After this periode your project will be deleted
                          completely and{" "}
                          <span className="text-black">
                            there is no going back.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      //handleClose();
                      setUpdateProjectLoading(true);
                      if (session?.user?.email) {
                        toast
                          .promise(
                            updateProjectActiveState({
                              active: false,
                              slug: project?.slug,
                            }),
                            {
                              loading: `Deactivate project ...`,
                              success: `Successfully deactivated!`,
                              error: (err) => err,
                            }
                          )
                          .then(() => {
                            setUpdateProjectLoading(false);
                            // find the project in the current user state userProjectRelations by slug and set it to inactive
                            const updatedUserProjectRelations =
                              currentUser?.userProjectRelations?.map(
                                (userProjectRelation) => {
                                  if (
                                    userProjectRelation.project?.slug ===
                                    project?.slug
                                  ) {
                                    return {
                                      ...userProjectRelation,
                                      project: {
                                        ...userProjectRelation.project,
                                        active: false,
                                      },
                                    };
                                  } else {
                                    return userProjectRelation;
                                  }
                                }
                              );
                            // update the current user state
                            setCurrentUser({
                              ...currentUser,
                              //@ts-ignore
                              userProjectRelations: updatedUserProjectRelations,
                              lastProject: null,
                            });
                            // close the modal
                            handleClose();
                            // navigate to discover page
                            navigate("/s/discover");
                          });
                      }
                    }}
                  >
                    {updateProjectLoading ? (
                      <Spinner color={"text-white"} />
                    ) : null}
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleClose()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { ProjectDeleteModal };
