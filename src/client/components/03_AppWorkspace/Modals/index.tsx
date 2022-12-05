"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useRef } from "react";

import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { useGetCurrentUserQuery } from "../../../graphql/getCurrentUser.generated";
import { projectCreateOpenState } from "../../../store/ui/modals";
import LoadingPage from "../../02_AppGlobal/Loading/Page/index";
import { ProjectCreate } from "./ProjectCreateModal";
import { ProjectCreateForm } from "./ProjectCreateModal/projectCreateForm";

const ProjectCreateModal: FC = () => {
  const { status } = useSession();
  const [projectCreateOpen, setProjectCreateOpen] = useRecoilState(
    projectCreateOpenState
  );

  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const cancelButtonRef = useRef(null);

  const { push: navigate } = useRouter();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    navigate("/");
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    return (
      <Transition.Root show={projectCreateOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setProjectCreateOpen}
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
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                  <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setProjectCreateOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div>
                    <ProjectCreateForm {...{}}>
                      {currentUser ? (
                        <>
                          <ProjectCreate user={currentUser} />
                        </>
                      ) : null}
                    </ProjectCreateForm>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  return null;
};

export default ProjectCreateModal;
