import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { analyticsOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import { Icon } from "../Icons";

const AnalyticsModal: FC = () => {
  const [analyticsOpen, setAnalyticsOpen] = useRecoilState(analyticsOpenState);
  const user = useRecoilValue(currentUserState);

  const cancelButtonRef = useRef(null);

  if (!user) return null;

  return (
    <Transition.Root show={analyticsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setAnalyticsOpen}
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
              <Dialog.Panel className="relative inline-block h-[800px] transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all @container sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    onClick={() => setAnalyticsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <div className="flex h-full flex-col">
                  <div className="flex flex-col gap-6 border-b border-zinc-200 bg-zinc-50 pt-4 pb-6">
                    <div className="flex flex-col gap-2 px-6 pt-4">
                      <p className="text-xl font-semibold text-zinc-900">
                        Analytics
                      </p>
                      <p className="text-base text-zinc-500">
                        Track all the trafic and events on you page with PostHog.
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-scroll">
                    {/* <ul className="grid grid-cols-1 gap-6 px-4 pt-3 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredStoreExtensions.map((storeExtension) => (
                        <div
                          key={storeExtension.id}
                          className="col-span-1 divide-y divide-gray-200 rounded-lg"
                        >
                          <Suspense fallback={<span>loading</span>}>
                            <StoreItem storeExtension={storeExtension} />
                          </Suspense>
                        </div>
                      ))}
                    </ul> */}
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

export default AnalyticsModal;
