import { Dialog, Transition } from "@headlessui/react";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { AuthType } from "@prisma/client";
import { FC, Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  ApiConnectorRoute,
  StoreExtension,
} from "../../graphql/types.generated";
import { useLazyRecoilValue } from "../../helper/useLazyRecoilValue";
import {
  preferencesApiState,
  preferencesExtensionState,
} from "../../store/extensions";
import { siteSlugState, siteState } from "../../store/site";
import { addingInProcessState } from "../../store/ui/addingBlock";
import { preferencesOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import { upsertExtension } from "../helper/upsertExtension";
import { Icon } from "../Icons";

const PreferencesModal: FC = () => {
  const [preferencesOpen, setPreferencesOpen] =
    useRecoilState(preferencesOpenState);
  const [preferencesExtension] = useRecoilState(preferencesExtensionState);
  const preferencesApi = useRecoilValue(preferencesApiState);

  const siteSlug = useRecoilValue(siteSlugState);
  const site = useLazyRecoilValue(useRecoilValueLoadable(siteState(siteSlug)));
  const user = useRecoilValue(currentUserState);
  const [, setAddingInProcess] = useRecoilState(addingInProcessState);

  const [preferences, setPreferences] = useState<string[]>([]);

  useEffect(() => {
    console.log(preferencesExtension, preferencesApi);
    if (preferencesExtension && preferencesApi) {
      setPreferences(fillPreferences(preferencesExtension, preferencesApi));
    }
  }, [preferencesExtension, preferencesApi]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //close modal
    setPreferencesOpen(false);

    //handleSubmit
    if (!preferencesExtension || !preferencesApi || !user) return;
    const processedPreferences: { key: string; value: string }[] = [];
    event.preventDefault();

    const keyArr = fillPreferences(preferencesExtension, preferencesApi);
    keyArr.map((key) => {
      // @ts-ignore
      processedPreferences.push({ key: key, value: event.target[key].value });
    });
    console.log(processedPreferences);

    if (!site) throw new Error("Site not found");
    if (!preferencesExtension.routes) throw new Error("No routes found");
    if (!preferencesApi) throw new Error("No preferences api found");
    if (!processedPreferences) throw new Error("No preferences found");

    try {
      await upsertExtension({
        userId: decodeGlobalID(user.id).id,
        siteId: decodeGlobalID(site.id).id,
        storeExtensionId: decodeGlobalID(preferencesExtension.id).id,
        apiConnectorName: preferencesApi,
        routes: preferencesExtension.routes.map((route) => {
          return {
            id: decodeGlobalID(route.id).id,
            url: route.url as string,
            apiConnector: {
              name: route.apiConnector?.name as string,
            },
          };
        }),
        preferences: processedPreferences,
        authType: AuthType.preferences,
      });
      //handle success
      setAddingInProcess("added");
    } catch (error) {
      //handle error
      console.log(error);
      toast.error("Something went wrong!");
      setAddingInProcess("unadded");
    }
  };

  const fillPreferences = (
    preferencesExtension: StoreExtension,
    preferencesApi: string
  ) => {
    const myPreferences: string[] = [];
    const extensionRoutes = preferencesExtension.routes;
    if (extensionRoutes) {
      extensionRoutes.map((route: ApiConnectorRoute) => {
        if (route.apiConnector?.name === preferencesApi) {
          if (route.urlParameter) {
            route.urlParameter.map((param) => {
              myPreferences.push(param);
            });
          }
        }
      });
    }
    return myPreferences.filter(
      (v, i, a) => a.findIndex((v2) => v2 === v) === i
    );
  };

  const handleClose = () => {
    setPreferencesOpen(false);
    setAddingInProcess("unadded");
  };

  return (
    <Transition.Root show={preferencesOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setPreferencesOpen}>
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
              <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[530px] sm:w-full sm:p-6">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                    onClick={() => handleClose()}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <form
                  className="mt-2 flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full flex flex-col justify-start items-start gap-2 pb-4">
                    <p className="text-xl font-semibold text-left text-zinc-900">
                      Preferences
                    </p>
                    <p className="text-xs font-medium text-left text-zinc-500">
                      Insert required preferences to access API data.
                    </p>
                  </div>
                  {preferences.map((preference, index) => (
                    <div key={index} className="w-full">
                      <label
                        htmlFor={preference}
                        className="block text-sm font-medium text-zinc-600"
                      >
                        {preference}
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id={preference}
                          name={preference}
                          type="text"
                          autoComplete={preference}
                          className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
                    >
                      Import
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PreferencesModal;
