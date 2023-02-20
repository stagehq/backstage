import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { AuthType } from "@prisma/client";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { StoreExtension } from "../../../graphql/types.generated";
import {
  preferencesApiState,
  preferencesExtensionState,
} from "../../../store/extensions";
import { siteSlugState, siteState } from "../../../store/site";
import { addingInProcessState } from "../../../store/ui/addingBlock";
import { preferencesOpenState, storeOpenState } from "../../../store/ui/modals";
import { currentUserState } from "../../../store/user";
import Spinner from "../../loading/Spinner";
import StoreWireframe from "../../storeWireframes";
import {
  addOAuthExtension,
  getApiNameOfExtension,
  getAuthTypeOfExtension,
  isExtensionPartOfSite,
} from "./helper";

interface StoreItemProps {
  storeExtension: StoreExtension;
}

const StoreItem: FC<StoreItemProps> = ({ storeExtension }) => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const refreshSite = useRecoilRefresher_UNSTABLE(siteState(siteSlug));
  const [, setOpenPreferencesModal] = useRecoilState(preferencesOpenState);
  const [, setOpenStoreModal] = useRecoilState(storeOpenState);
  const [, setPreferencesExtension] = useRecoilState(preferencesExtensionState);
  const [, setPreferencesApi] = useRecoilState(preferencesApiState);
  const user = useRecoilValue(currentUserState);
  const [addingInProcess, setAddingInProcess] =
    useRecoilState(addingInProcessState);
  const [addingState, setAddingState] = useState<
    "unadded" | "added" | "loading"
  >("unadded");

  let isAdded: boolean | null = false;

  if (site && storeExtension) {
    isAdded = isExtensionPartOfSite(storeExtension, site);
  }

  useEffect(() => {
    setAddingState(isAdded ? "added" : "unadded");
  }, [isAdded]);

  useEffect(() => {
    if (addingInProcess !== "loading" && addingState === "loading") {
      setAddingState(addingInProcess);
      if (addingInProcess === "added") {
        //refreshSite();
        console.log("Added");
        setOpenStoreModal(false);
      }
    }
  }, [addingInProcess, addingState, refreshSite]);

  const clickHandler = async (storeExtension: StoreExtension) => {
    setAddingInProcess("loading");
    setAddingState("loading");
    const apiName = getApiNameOfExtension(storeExtension);
    const authType = getAuthTypeOfExtension(storeExtension);

    if (!site || !storeExtension || !user) return null;
    const isAdded = isExtensionPartOfSite(storeExtension, site);
    if (isAdded) return null;

    if (authType === AuthType.oAuth) {
      try {
        await addOAuthExtension(
          apiName,
          storeExtension,
          site,
          setSite,
          user,
          setAddingInProcess,
          setOpenStoreModal
        );
        setAddingInProcess("added");
      } catch (error) {
        //handle error
        console.log(error);
        toast.error("Something went wrong!");
        setAddingInProcess("unadded");
      }
    } else if (authType === AuthType.preferences) {
      setPreferencesApi(apiName);
      setPreferencesExtension(storeExtension);
      setOpenPreferencesModal(true);
    } else if (authType === AuthType.oAuthWithPreferences) {
      console.log("oAuthWithPreferences");
    } else {
      console.log("noAuth");
    }
  };

  console.log(storeExtension.image);

  return (
    <div
      className={clsx(
        "relative flex w-full cursor-pointer flex-col gap-3 rounded-lg p-4",
        isAdded ? "cursor-not-allowed" : "hover:bg-zinc-50"
      )}
      onClick={() => clickHandler(storeExtension)}
    >
      <div
        className={clsx(
          "relative w-full overflow-hidden rounded-md border border-zinc-200 bg-zinc-200"
        )}
      >
        {storeExtension.image && <StoreWireframe name={storeExtension.image} />}
      </div>
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-semibold text-zinc-900">
            {storeExtension.name}
          </p>
          {addingState === "added" && (
            <div className="flex items-center gap-1 rounded-full bg-green-200 p-1 text-xs text-green-800">
              <CheckCircleIcon className="h-5 w-5" />
            </div>
          )}
          {addingState === "loading" && <Spinner color="text-zinc-600" />}
        </div>
        <p className="text-sm text-zinc-700">{storeExtension.description}</p>
      </div>
    </div>
  );
};

export default StoreItem;
