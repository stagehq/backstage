import { decodeGlobalID } from "@pothos/plugin-relay";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateExtensionTitleMutation } from "../../../graphql/updateExtensionTitle.generated";
import { siteSlugState, siteState } from "../../../store/site";

/**
 * @function
 * @name useChangeExtensionTitle
 *
 * @description
 * A custom hook that updates the title of an extension in the database and in the Recoil state.
 *
 * @returns {Function} changeExtensionTitle - A function that takes in an extension id and a title, and updates the title of the extension in the database and in the Recoil state.
 */

export const useChangeExtensionTitle = () => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  const [, updateExtensionTitle] = useUpdateExtensionTitleMutation();

  const changeExtensionTitle = async (id: string, title: string) => {
    try {
      // update extension in database
      
      await updateExtensionTitle({
        id: decodeGlobalID(id).id,
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

  return changeExtensionTitle;
};
