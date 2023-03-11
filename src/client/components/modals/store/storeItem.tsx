import { AuthType } from "@prisma/client";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
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
} from "./helper";

interface StoreItemProps {
  storeExtension: StoreExtension;
}

const StoreItem: FC<StoreItemProps> = ({ storeExtension }) => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [, setOpenPreferencesModal] = useRecoilState(preferencesOpenState);
  const [, setOpenStoreModal] = useRecoilState(storeOpenState);
  const [, setPreferencesExtension] = useRecoilState(preferencesExtensionState);
  const [, setPreferencesApi] = useRecoilState(preferencesApiState);
  const user = useRecoilValue(currentUserState);
  const [addingInProcess, setAddingInProcess] =
    useRecoilState(addingInProcessState);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    if (addingInProcess !== "loading" && loadingState) {
      setLoadingState(false);
    }
  }, [addingInProcess, loadingState]);

  const clickHandler = async (storeExtension: StoreExtension) => {
    setAddingInProcess("loading");
    setLoadingState(true);
    const apiName = getApiNameOfExtension(storeExtension);
    const authType = getAuthTypeOfExtension(storeExtension);

    if (!site || !storeExtension || !user) return null;

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
        // console.log(error);
        toast.error("Something went wrong!");
        setAddingInProcess("unadded");
      }
    } else if (authType === AuthType.preferences) {
      setPreferencesApi(apiName);
      setPreferencesExtension(storeExtension);
      setOpenPreferencesModal(true);
    } else if (authType === AuthType.oAuthWithPreferences) {
      // console.log("oAuthWithPreferences");
    } else {
      // console.log("noAuth");
    }
  };

  return (
    <div
      className="relative flex w-full cursor-pointer flex-col gap-3 rounded-lg p-4 hover:bg-zinc-50"
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
          {loadingState && <Spinner color="text-zinc-600" />}
        </div>
        <p className="text-sm text-zinc-700">{storeExtension.description}</p>
      </div>
    </div>
  );
};

export default StoreItem;
