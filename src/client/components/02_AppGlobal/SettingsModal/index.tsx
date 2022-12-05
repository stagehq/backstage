"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useRef } from "react";

import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { settingsOpenState } from "../../../store/ui/modals";
import { currentUserState } from "../../../store/user";
import LoadingPage from "../Loading/Page";
import BillingHistory from "../Settings/BillingHistory";
import Integrations from "../Settings/Integrations";
import Notifications from "../Settings/Notifications";
import Plan from "../Settings/Plan";
import { Profile } from "../Settings/Profile";
import { SettingsForm } from "../Settings/SettingsForm";

const SettingsModal: FC = () => {
  const { push: navigate } = useRouter();
  const { status } = useSession();
  const [settingsOpen, setSettingsOpen] = useRecoilState(settingsOpenState);
  const [currentUser] = useRecoilStateLoadable(currentUserState);

  const cancelButtonRef = useRef(null);

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    navigate("/");
    return <LoadingPage />;
  }

  if (status === "authenticated" && currentUser.state === "hasValue") {
    const user = currentUser.contents;
    return (
      <Transition.Root show={settingsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setSettingsOpen}
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
                      onClick={() => setSettingsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div>
                    <SettingsForm {...{}}>
                      {user ? (
                        <>
                          <Profile user={user} />
                          <Notifications user={user} />
                          <Plan user={user} />
                          <BillingHistory />
                          <Integrations />
                        </>
                      ) : null}
                    </SettingsForm>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => setSettingsOpen(false)}
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
  }

  return null;
};

export default SettingsModal;
