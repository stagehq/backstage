import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, Fragment, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { analyticsOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import { Icon } from "../Icons";

const AnalyticsModal: FC = () => {
  //recoil
  const [analyticsOpen, setAnalyticsOpen] = useRecoilState(analyticsOpenState);
  const user = useRecoilValue(currentUserState);

  //ref
  const cancelButtonRef = useRef(null);

  //state
  const [key, setKey] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [fieldsEdited, setFieldsEdited] = useState(false);

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
              <Dialog.Panel className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all @container sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
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
                        Track all the trafic and events on you page with
                        PostHog.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 p-5">
                    <div className="h-60 w-full rounded-lg bg-zinc-200"></div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        PostHog key
                      </label>
                      <input
                        type="text"
                        name="PostHogkey"
                        id="PostHogkey"
                        autoComplete="given-name"
                        value={key}
                        onChange={(event) => setKey(event.target.value)}
                        className={clsx(
                          "mt-1 block w-full min-w-0 flex-1 rounded-md border-zinc-300 text-gray-900 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                          // !firstNameValid &&
                          //   "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
                        )}
                      />
                      {/* {!firstNameValid && (
                        <p className="text-zinc-gray-500 mt-2 text-sm" id="email-error">
                          Please provide a valid first name.
                        </p>
                      )} */}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Host url
                      </label>
                      <input
                        type="text"
                        name="host-url"
                        id="host-url"
                        autoComplete="family-name"
                        value={host}
                        onChange={(event) => setHost(event.target.value)}
                        className={clsx(
                          "mt-1 block w-full min-w-0 flex-1 rounded-md border-zinc-300 text-gray-900 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                          // !lastNameValid &&
                          //   "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
                        )}
                      />
                      {/* {!lastNameValid && (
                        <p className="text-zinc-gray-500 mt-2 text-sm" id="email-error">
                          Please provide a valid last name.
                        </p>
                      )} */}
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

export default AnalyticsModal;
