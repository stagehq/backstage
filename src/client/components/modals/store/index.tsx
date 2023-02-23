import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, Suspense, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StoreExtension } from "../../../graphql/types.generated";
import { storeExtensionState } from "../../../store/extensions";
import { storeOpenState } from "../../../store/ui/modals";
import { Icon } from "../../Icons";
import { filterArray } from "./helper";
import Search from "./search";
import StoreItem from "./storeItem";

const StoreModal: FC = () => {
  const [storeOpen, setStoreOpen] = useRecoilState(storeOpenState);
  const storeExtensions = useRecoilValue(storeExtensionState);

  const [search, setSearch] = useState<string>("");
  const [filteredStoreExtensions, setFilteredStoreExtensions] = useState<
    StoreExtension[] | null
  >(storeExtensions);

  useEffect(() => {
    if (storeExtensions != null && search != null) {
      setFilteredStoreExtensions(filterArray(storeExtensions, search));
    }
  }, [search, storeExtensions]);

  const cancelButtonRef = useRef(null);

  if (!filteredStoreExtensions) return null;

  return (
    <Transition.Root show={storeOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setStoreOpen}
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
              <Dialog.Panel className="relative inline-block h-full w-full max-w-4xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all @container sm:my-8 sm:h-[800px] sm:align-middle">
                <div className="absolute top-0 right-0 block pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    onClick={() => setStoreOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <div className="flex h-full flex-col">
                  <div className="flex flex-col gap-6 border-b border-zinc-200 bg-zinc-50 pt-4">
                    <div className="flex flex-col gap-2 px-6 pt-4">
                      <p className="text-xl font-semibold text-zinc-900">
                        Add a block
                      </p>
                      <p className="text-base text-zinc-500">
                        Extend your website with blocks that enriches the
                        experience on your site
                      </p>
                    </div>
                    <div className="px-6 pb-6">
                      <Search setSearch={setSearch} search={search} />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-scroll">
                    <ul className="grid grid-cols-1 gap-6 px-4 pt-3 pb-3 sm:grid-cols-2 lg:grid-cols-3">
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
                    </ul>
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

export default StoreModal;
