import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { FC, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { settingsOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import { Icon } from "../Icons";
import LoadingPage from "../loading/Page";
import BillingHistory from "./settings/BillingHistory";
import Integrations from "./settings/Integrations";
import Plan from "./settings/Plan";
import { Profile } from "./settings/Profile";
import { SettingsForm } from "./settings/SettingsForm";

const SettingsModal: FC = () => {
  const navigate = useNavigate();
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

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
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
                <Dialog.Panel className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all @container pb-4 sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                      onClick={() => setSettingsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <Icon name="XMarkIcon" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-6 border-b border-zinc-200 bg-zinc-50 pt-4 pb-6">
                    <div className="flex flex-col gap-2 px-6 pt-4">
                      <p className="text-xl font-semibold text-zinc-900">
                        User Settings
                      </p>
                      <p className="text-base text-zinc-500">
                        Edit your profile, plan, and billing information.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <SettingsForm {...{}}>
                      {user ? (
                        <>
                          <Profile user={user} />
                          {/* <Plan user={user} /> */}
                          {/* <BillingHistory /> */}
                          {/* <Integrations /> */}
                        </>
                      ) : null}
                    </SettingsForm>
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
