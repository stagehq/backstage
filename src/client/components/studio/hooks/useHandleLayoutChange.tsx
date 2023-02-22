import { RefObject } from "react";
import { Layouts } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
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
    newlayouts?: Layouts
  ) => {
    let currentLayouts = newlayouts ? newlayouts : site?.layouts;
    if (!currentLayouts || !site) return null;

    //calculate height
    const calculateLayout = () => {
      if (!currentLayouts || !currentLayouts[breakpoint]) return null;
      let index = 0;
      const newItems = [...currentLayouts[breakpoint]];

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
    await new Promise((resolve) =>
      setTimeout(() => {
        calculateLayout();
        resolve(true);
      }, 100)
    );

    // console.log(currentLayouts);
    //update layout
    if (site) {
      setSite({
        ...site,
        layouts: currentLayouts,
      });
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
