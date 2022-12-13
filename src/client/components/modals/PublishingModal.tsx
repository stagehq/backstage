import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { publishingOpenState } from "../../store/ui/modals";
import { publishingState } from "../../store/ui/publishing";
import { publishingOptions } from "../PublishingDropdown";

export default function PublishingMobileModal() {
  const [publishingOpen, setPublishingOpen] =
    useRecoilState(publishingOpenState);
  const [publishing, setPublishing] = useRecoilState(publishingState);

  return (
    <Transition.Root show={publishingOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 md:hidden"
        onClose={setPublishingOpen}
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
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-t-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm sm:p-6">
                {publishingOptions.map((option) => (
                  <div
                    key={option.title}
                    className={clsx(
                      publishing === option
                        ? "text-zinc-700 bg-zinc-100"
                        : "text-zinc-900",
                      "cursor-default select-none p-4 text rounded-md"
                    )}
                    onClick={() => {
                      setPublishing(option);
                      setPublishingOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={clsx(
                              "mr-1 w-2.5 h-2.5 rounded-md",
                              option.title === "Published"
                                ? "bg-emerald-400"
                                : option.title === "Unlisted"
                                ? "bg-transparent border-2 border-emerald-400"
                                : "bg-rose-500 border-transparent"
                            )}
                          />
                          <p
                            className={
                              publishing === option
                                ? "font-semibold"
                                : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                        </div>
                        {publishing === option ? (
                          <span className="text-zinc-700">
                            <CheckIcon className="h-6 w-6" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <p className="text-zinc-500 mt-2">{option.description}</p>
                    </div>
                  </div>
                ))}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
