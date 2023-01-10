import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateExtensionTitleMutation } from "../../../graphql/updateExtensionTitle.generated";
import { siteSlugState, siteState } from "../../../store/site";

/**
 * @description
 * This hook is used to change the title of an extension.
 * @returns {Object} - Returns an object with the changeExtensionTitle function.
 * @example
 * const { changeExtensionTitle } = useChangeExtensionTitle();
 * changeExtensionTitle("id", "new title");
 */

export const useChangeExtensionTitle = () => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  const [, updateExtensionTitle] = useUpdateExtensionTitleMutation();

  const changeExtensionTitle = async (id: string, title: string) => {
    try {
      // update extension in database
      await updateExtensionTitle({
        id,
        title,
      });

      // update extension in recoil site store with id
      if (!site) return null;
      setSite((site) => {
        if (site) {
          const newSite = { ...site };
          if (!newSite.extensions) return null;
          const index = newSite.extensions.findIndex(
            (extension) => extension.id === id
          );
          if (index !== -1) {
            newSite.extensions[index].title = title;
          }
          return newSite;
        } else {
          return site;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { changeExtensionTitle };
};
