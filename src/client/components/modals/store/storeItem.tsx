import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { StoreExtension } from "../../../graphql/types.generated";
import { siteSlugState, siteState } from "../../../store/site";
import StoreWireframe from "../../storeWireframes";
import { isExtensionPartOfSite } from "./helper";

interface StoreItemProps {
  storeExtension: StoreExtension;
}

const StoreItem: FC<StoreItemProps> = ({ storeExtension }) => {
  const siteSlug = useRecoilValue(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  if (!site || !storeExtension) return null;
  const isAdded = isExtensionPartOfSite(storeExtension, site);

  return (
    <div className="w-full relative p-4 hover:bg-zinc-50 rounded-lg cursor-pointer flex flex-col gap-3">
      <div className="w-full relative bg-zinc-200 rounded-md overflow-hidden border border-zinc-200">
        {storeExtension.image && <StoreWireframe name={storeExtension.image} />}
        {isAdded && (
          <div className="absolute w-full h-full top-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-500 absolute top-3 right-3"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold text-base text-zinc-900">
          {storeExtension.name}
        </p>
        <p className="text-sm text-zinc-700">{storeExtension.description}</p>
      </div>
    </div>
  );
};

export default StoreItem;
