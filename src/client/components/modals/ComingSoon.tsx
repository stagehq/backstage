import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useRef } from "react";
import { useRecoilState } from "recoil";
import { soonOpenState } from "../../store/ui/modals";
import { Icon } from "../Icons";

const SoonModal: FC = () => {
  const [soonOpen, setSoonOpen] = useRecoilState(soonOpenState);
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={soonOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setSoonOpen}
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
              <Dialog.Panel className="relative inline-block w-full max-w-4xl transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    onClick={() => setSoonOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <div>
                  <span>Coming soon.</span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SoonModal;
