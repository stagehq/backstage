import { Dialog, Transition } from "@headlessui/react";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { AuthType } from "@prisma/client";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StoreExtension } from "../../../graphql/types.generated";
import { preferencesApiState, preferencesExtensionState, storeExtensionState } from "../../../store/extensions";
import { siteSlugState, siteState } from "../../../store/site";
import { preferencesOpenState, storeOpenState } from "../../../store/ui/modals";
import { currentUserState } from "../../../store/user";
import { Icon } from "../../Icons";
import { addOAuthExtension, filterArray, getApiNameOfExtension, getAuthTypeOfExtension, isExtensionPartOfSite } from "./helper";
import Search from "./search";
import StoreItem from "./storeItem";
import { upsertExtension } from "../../helper/upsertExtension";

const StoreModal: FC = () => {
  const [storeOpen, setStoreOpen] = useRecoilState(storeOpenState);
  const user = useRecoilValue(currentUserState);
  const storeExtensions = useRecoilValue(storeExtensionState);
  const siteSlug = useRecoilValue(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));
  const [, setOpenPreferencesModal] = useRecoilState(preferencesOpenState);
  const [, setPreferencesExtension] = useRecoilState(
    preferencesExtensionState
  );
  const [, setPreferencesApi] =
    useRecoilState(preferencesApiState);

  const [search, setSearch] = useState<string >("");
  const [filteredStoreExtensions, setFilteredStoreExtensions] = useState<StoreExtension[] | null>(storeExtensions);

  useEffect(() => {
    if(storeExtensions != null && search != null){
      setFilteredStoreExtensions(filterArray(storeExtensions, search));
    }
  },[search, storeExtensions])

  const cancelButtonRef = useRef(null);

  if (!user) return null;
  if (!filteredStoreExtensions) return null;

  

  const clickHandler = async (storeExtension: StoreExtension) => {
    const apiName = getApiNameOfExtension(storeExtension);
    const authType = getAuthTypeOfExtension(storeExtension);

    if (!site || !storeExtension) return null;
    const isAdded = isExtensionPartOfSite(storeExtension, site);
    if (isAdded) return null;
    
    if(authType === AuthType.oAuth){
      addOAuthExtension(apiName, storeExtension, site, user)
    }else if(authType === AuthType.preferences){
      setPreferencesApi(apiName);
      setPreferencesExtension(storeExtension);
      setOpenPreferencesModal(true);
    }else if(authType === AuthType.oAuthWithPreferences){
      console.log("oAuthWithPreferences");
    }else{
      console.log("noAuth")
    }
  }

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
              <Dialog.Panel className="@container relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full h-[800px]">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                    onClick={() => setStoreOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <div className="flex flex-col h-full">
                  <div className="pt-4 flex flex-col gap-6 bg-zinc-50 border-b border-zinc-200">
                    <div className="flex flex-col gap-2 px-6 pt-4">
                      <p className="font-semibold text-xl text-zinc-900">Add a block</p>
                      <p className="text-base text-zinc-500">Extend your website with blocks that enriches the experience on your site</p>
                    </div>
                    <div className="px-6 pb-6">
                      <Search setSearch={setSearch} search={search}/>
                    </div> 
                  </div>
                  <div className="flex-1 overflow-y-scroll">
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 pt-3">
                      {filteredStoreExtensions.map((storeExtension) => (
                        <div className="col-span-1 divide-y divide-gray-200 rounded-lg" onClick={() => clickHandler(storeExtension)}>
                          <StoreItem storeExtension={storeExtension}/>
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
