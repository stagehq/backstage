import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { subdomainCardOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import { Icon } from "../Icons";
import { OnboardingSubdomain } from "../onboarding/Onboarding";

const SubdomainModal: FC = () => {
  const [subdomainCardOpen, setSubdomainCardOpen] = useRecoilState(subdomainCardOpenState);
  const user = useRecoilValue(currentUserState);

  const cancelButtonRef = useRef(null);

  if (!user) return null;

  return (
    <Transition.Root show={subdomainCardOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setSubdomainCardOpen}
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
              <Dialog.Panel className="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:h-auto sm:align-middle">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                    onClick={() => setSubdomainCardOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <div className="min-h-full flex flex-col justify-center">
                  <div className="sm:max-w-sm">
                    <div className="h-screen sm:h-full sm:min-h-[530px] bg-white sm:border sm:border-white sm:shadow-[0_4px_100px_0_rgba(0,0,0,0.08)] shadow-zinc-400 sm:rounded-2xl overflow-hidden">
                      <div className="flex flex-col h-full sm:min-h-[530px]">
                        <OnboardingSubdomain />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubdomainModal;
