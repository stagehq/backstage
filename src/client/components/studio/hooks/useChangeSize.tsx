import { Layout } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { siteSlugState, siteState } from "../../../store/site";
import { gridBreakpointState } from "../../../store/ui/grid-dnd";
import { useHandleLayoutChange } from "./useHandleLayoutChange";

/**
 * Custom hook that allows for changing the size of a grid layout extension.
 *
 * @return {Function} changeExtensionSize - A function that allows for changing the size of a specific grid layout extension.
 *
 * @param {string} id - The id of the extension to be resized.
 * @param {1|2|3} size - The new size of the extension, with 1 being the smallest and 3 being the largest.
 */

export const useChangeExtensionSize = () => {
  const breakpoint = useRecoilValue(gridBreakpointState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site] = useRecoilState(siteState(siteSlug));
  const handleLayoutChange = useHandleLayoutChange();

  const changeExtensionSize = (
    id: string,
    size: 1 | 2 | 3,
    gridRef: React.RefObject<HTMLDivElement>
  ) => {
    if (!site) return null;
    const newGridLayout = { ...site.layouts };
    const newLayout = newGridLayout[breakpoint].map((layout: Layout) => {
      if (layout.i === id) {
        return { ...layout, w: size };
      }
      return layout;
    });
    newGridLayout[breakpoint] = newLayout;
    handleLayoutChange(gridRef, newGridLayout);

    window.dispatchEvent(new Event("resize"));
  };

  return changeExtensionSize;
};
