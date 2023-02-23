import { RefObject } from "react";
import { Layouts } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { Site } from "../../../graphql/types.generated";
import { useUpdateSiteLayoutsMutation } from "../../../graphql/updateSiteLayouts.generated";
import { siteSlugState, siteState } from "../../../store/site";
import { gridBreakpointState } from "../../../store/ui/grid-dnd";

/**
 * @function
 * @name useDeleteExtension
 *
 * @description
 * A custom hook that provides a way to delete an extension from a site.
 * It uses the `deleteExtension` mutation to delete the extension from the database and updates the Recoil state with the updated list of extensions.
 *
 * @returns {Function} deleteExtensionFromSite - A function that takes an extension id as parameter and deletes the extension from the site.
 */

export const useHandleLayoutChange = () => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [breakpoint] = useRecoilState(gridBreakpointState);

  const [, updateSiteLayouts] = useUpdateSiteLayoutsMutation();

  const handleLayoutChange = async (
    itemsRef: RefObject<HTMLDivElement>,
    newlayouts?: Layouts,
    alternativeSite?: Site | undefined,
    alternativeSetSite?: (value: Site) => void,
    alternativeBreakpoint?: string
  ) => {
    let currentLayouts = newlayouts ? newlayouts : site?.layouts;
    if(site == null && alternativeSite) currentLayouts = alternativeSite.layouts;
    if (!currentLayouts || !(site || alternativeSite)) return null;
    
    console.log("before calculation", currentLayouts);

    //calculate height
    const calculateLayout = () => {
      if (!currentLayouts || !(breakpoint || alternativeBreakpoint)) return null;
      let index = 0;
      const currentBreakPoint = breakpoint ? breakpoint : alternativeBreakpoint;
      if(!currentBreakPoint) return null;
      if(!currentLayouts[currentBreakPoint]) return null;
      const newItems = [...currentLayouts[currentBreakPoint]];

      console.log("everything ready for calculation");

      if (itemsRef.current?.children[0].children) {
        for (const element of itemsRef.current.children[0].children) {
          const content = element.children[0] as HTMLDivElement;
          if (content.offsetHeight !== 0) {
            const newHeight =
              (content.offsetHeight - content.offsetHeight / 32 + 32) / 32;
            newItems[index] = {
              ...newItems[index],
              h: newHeight,
              minH: newHeight,
            };
            index++;
          }
        }
      }
      currentLayouts = Object.assign({}, currentLayouts, {
        [breakpoint]: newItems,
      });
    };
    calculateLayout();
    console.log("after calculation", currentLayouts);

    await new Promise((resolve) =>
      setTimeout(() => {
        calculateLayout();
        console.log("after second calculation", currentLayouts);
        resolve(true);
      }, 100)
    );

    // console.log(currentLayouts);
    //update layout
    if (site) {
      console.log("for dynamic rendering");
      setSite({
        ...site,
        layouts: currentLayouts,
      });
    } else if(alternativeSite && alternativeSetSite) {
      console.log("for static rendering");
      alternativeSetSite({
        ...alternativeSite,
        layouts: currentLayouts,
      })
    }

    //update db
    if (!site?.subdomain || !currentLayouts) return null;
    const response = await updateSiteLayouts({
      id: site.subdomain,
      layouts: JSON.stringify(currentLayouts),
    });
    if (response.data?.updateSiteLayouts) {
      //console.log(response.data?.updateSiteLayouts);
    }
  };

  return handleLayoutChange;
};
