import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { decodeGlobalID, encodeGlobalID } from "@pothos/plugin-relay";
import { AuthType } from "@prisma/client";
import { FC, Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { uploadFile } from "../../../server/aws/helper";
import {
  ApiConnectorRoute,
  StoreExtension,
} from "../../graphql/types.generated";
import { useUpdateUploadCreditMutation } from "../../graphql/updateUploadCredit.generated";
import {
  preferencesApiState,
  preferencesExtensionState,
} from "../../store/extensions";
import { siteSlugState, siteState } from "../../store/site";
import { addingInProcessState } from "../../store/ui/addingBlock";
import { preferencesOpenState, storeOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import { upsertExtension } from "../helper/upsertExtension";
import { Icon } from "../Icons";

const PreferencesModal: FC = () => {
  const [preferencesOpen, setPreferencesOpen] =
    useRecoilState(preferencesOpenState);
  const [preferencesExtension] = useRecoilState(preferencesExtensionState);
  const preferencesApi = useRecoilValue(preferencesApiState);

  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const user = useRecoilValue(currentUserState);
  const [, setAddingInProcess] = useRecoilState(addingInProcessState);
  const [, setOpenStoreModal] = useRecoilState(storeOpenState);

  const [, updateUploadCredit] = useUpdateUploadCreditMutation();

  const [preferences, setPreferences] = useState<string[]>([]);

  useEffect(() => {
    if (preferencesExtension && preferencesApi) {
      setPreferences(fillPreferences(preferencesExtension, preferencesApi));
    }
  }, [preferencesExtension, preferencesApi]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //close modal
    setPreferencesOpen(false);
    if (site?.extensions && site.extensions?.length < 10) {
      //handleSubmit
      if (!preferencesExtension || !preferencesApi || !user) return;
      const processedPreferences: { key: string; value: string }[] = [];
      event.preventDefault();

      const keyArr = fillPreferences(preferencesExtension, preferencesApi);
      await Promise.all(
        keyArr.map((key: string) => {
          return new Promise<void>((resolve) => {
            // @ts-ignore
            if (event.target[key].files) {
              updateUploadCredit().then((result) => {
                if (result.data?.updateUploadCredit) {
                  // console.log("Updated Credit");
                } else {
                  throw new Error("Error adding upload credit to user");
                }
              });

              if (user.uploadCredit && user.uploadCredit < 100) {
                uploadFile(
                  // @ts-ignore
                  event.target[key].files[0],
                  decodeGlobalID(user.id).id,
                  "blockImage"
                ).then((data) => {
                  if (data) {
                    processedPreferences.push({ key: key, value: data });
                    resolve();
                  } else {
                    resolve();
                  }
                });
              } else {
                setAddingInProcess("unadded");
                toast.error(
                  "Wow, you already uploaded 200 images!! Congrats 🎊 If you want more images, please get in touch."
                );
              }
            } else {
              processedPreferences.push({
                key: key,
                // @ts-ignore
                value: event.target[key].value,
              });
              resolve();
            }
          });
        })
      );

      if (!site) throw new Error("Site not found");
      if (!preferencesExtension.routes) throw new Error("No routes found");
      if (!preferencesApi) throw new Error("No preferences api found");
      if (!processedPreferences) throw new Error("No preferences found");

      try {
        const response = await upsertExtension({
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
        const newSite = {
          ...site,
          extensions: [
            ...(site.extensions ? site.extensions : []),
            {
              ...response.extension,
              id: encodeGlobalID("Extension", response.extension.id),
              storeExtension: {
                ...response.extension.storeExtension,
                id: encodeGlobalID(
                  "StoreExtension",
                  response.extension.storeExtension.id
                ),
              },
            },
          ],
        };
        // console.log(response);
        setSite({ ...newSite });
        //handle success
        setAddingInProcess("added");
        setOpenStoreModal(false);
      } catch (error) {
        //handle error
        // console.log(error);
        toast.error(
          "Oops! It's not your fault, seems like this doesn't work atm. We're working hard to bring more functionality to Stage soon."
        );
        setAddingInProcess("unadded");
      }
    } else {
      event.preventDefault();
      toast.error("Block limit reached!");
      setAddingInProcess("unadded");
      setOpenStoreModal(false);
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
              <Dialog.Panel className="relative inline-block w-full max-w-[530px] transform overflow-hidden rounded-lg bg-white p-6 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
                <div className="absolute top-0 right-0 block pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
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
                  <div className="flex w-full flex-col items-start justify-start gap-2 pb-4">
                    <p className="text-left text-xl font-semibold text-zinc-900">
                      Preferences
                    </p>
                    <p className="text-left text-xs font-medium text-zinc-500">
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
                      <div className="relative mt-1">
                        {preference === "image path" ? (
                          <FileInput preference={preference} />
                        ) : (
                          <input
                            id={preference}
                            name={preference}
                            type="text"
                            autoComplete={preference}
                            className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-zinc-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-30"
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

interface FileInput {
  preference: string;
}

const FileInput: FC<FileInput> = ({ preference }) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <div className="flex flex-col items-start gap-4">
      <label className="flex w-full cursor-pointer justify-center rounded-md border border-zinc-300 bg-zinc-100 py-2 text-sm hover:bg-zinc-200">
        <input
          id={preference}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          className="hidden"
          onChange={(event) => setFile(event.target.files?.[0])}
        />
        {file ? "Change image" : "Upload image"}
      </label>
      {file && (
        <div className="flex gap-2 text-sm font-medium text-zinc-600">
          <CheckCircleIcon className="h-5 w-5" />
          {file.name}
        </div>
      )}
    </div>
  );
};
