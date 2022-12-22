import { useRegisterActions } from "kbar";
import { useRecoilValue } from "recoil";
import { storeExtensionState } from "../../../store/extensions";
import { Icon } from "../../Icons";

export function useStoreExtensionActions() {
  const storeExtensions = useRecoilValue(storeExtensionState);

  let storeExtensionActions = [
    {
      name: "Store",
      id: "store",
      icon: <Icon name="ShoppingBagIcon" size="md" color="dark" />,
      priority: 1,
    },
  ];

  if (storeExtensions) {
    const dynamicList = storeExtensions.map((storeExtension) => {
      return {
        name: storeExtension.name,
        id: storeExtension.id,
        parent: "store",
        icon: <Icon name="RectangleGroupIcon" size="md" color="dark" />,
        action: () => {
          console.log("storeExtension.id: " + storeExtension.id);
          
        },
      };
    });
    /* @ts-ignore */
    storeExtensionActions = [...storeExtensionActions, ...dynamicList];
  } else {
    storeExtensionActions.push({
      name: "No extensions found",
      id: "noExtensions",
      icon: <Icon name="XMarkIcon" size="md" color="dark" />,
      priority: 2,
    });
  }

  useRegisterActions(storeExtensionActions);
}
