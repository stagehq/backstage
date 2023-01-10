import { FC } from "react";
import { StoreExtension } from "../../../graphql/types.generated";
import StoreWireframe from "../../storeWireframes";

interface StoreItemProps {
  storeExtension: StoreExtension;
}

const StoreItem:FC<StoreItemProps> = ({storeExtension}) => {
  return <div className="w-full p-4 hover:bg-zinc-50 rounded-lg cursor-pointer flex flex-col gap-3">
    <div className="w-full bg-zinc-200 rounded-md overflow-hidden border border-zinc-200">
      {storeExtension.image && <StoreWireframe name={storeExtension.image}/>}
    </div>
    <div>
      <p className="font-semibold text-base text-zinc-900">{storeExtension.name}</p>
      <p className="text-sm text-zinc-700">{storeExtension.description}</p>
    </div>
  </div>
}

export default StoreItem;
