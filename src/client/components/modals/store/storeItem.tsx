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
import { preferencesOpenState } from "../../../store/ui/modals";
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
  const [site,] = useRecoilState(siteState(siteSlug));
  const refreshSite = useRecoilRefresher_UNSTABLE(siteState(siteSlug));
  const [, setOpenPreferencesModal] = useRecoilState(preferencesOpenState);
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
        refreshSite();
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
        await addOAuthExtension(apiName, storeExtension, site, user);
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

  return (
    <div
      className={clsx(
        "w-full relative p-4 rounded-lg cursor-pointer flex flex-col gap-3",
        isAdded ? "cursor-not-allowed" : "hover:bg-zinc-50"
      )}
      onClick={() => clickHandler(storeExtension)}
    >
      <div
        className={clsx(
          "w-full relative bg-zinc-200 rounded-md overflow-hidden border border-zinc-200"
        )}
      >
        {storeExtension.image && <StoreWireframe name={storeExtension.image} />}
      </div>
      <div>
        <div className="flex gap-2 justify-between items-center">
          <p className="font-semibold text-base text-zinc-900">
            {storeExtension.name}
          </p>
          {addingState === "added" && (
            <div className="p-1 bg-green-200 text-green-800 text-xs rounded-full flex items-center gap-1">
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
