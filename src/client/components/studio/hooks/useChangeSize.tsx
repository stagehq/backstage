import { Layouts } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  gridBreakpointState,
  gridLayoutState,
} from "../../../store/ui/grid-dnd";
import { updateLayout } from "../../dnd/utils";

/**
 * Custom hook that allows for changing the size of a grid layout extension.
 *
 * @return {Function} changeExtensionSize - A function that allows for changing the size of a specific grid layout extension.
 *
 * @param {string} id - The id of the extension to be resized.
 * @param {1|2|3} size - The new size of the extension, with 1 being the smallest and 3 being the largest.
 */

export const useChangeExtensionSize = () => {
  const [layouts, setLayouts] = useRecoilState(gridLayoutState);
  const breakpoint = useRecoilValue(gridBreakpointState);

  const changeExtensionSize = (id: string, size: 1 | 2 | 3, gridRef: React.RefObject<HTMLDivElement>) => {    
    const newGridLayout = { ...layouts };
    const newLayout = newGridLayout[breakpoint].map((layout) => {
      if (layout.i === id) {
        return { ...layout, w: size };
      }
      return layout;
    });
    newGridLayout[breakpoint] = newLayout;
    const heightAdjustedLayout = updateLayout(newGridLayout[breakpoint], gridRef);
    console.log(heightAdjustedLayout);
    
    setLayouts(Object.assign({}, layouts, { [breakpoint]: heightAdjustedLayout }));

    window.dispatchEvent(new Event("resize"));
  };

  return changeExtensionSize;
};
