import { useRecoilState, useRecoilValue } from "recoil";
import { useDeleteExtensionMutation } from "../../../graphql/deleteExtension.generated";
import { siteSlugState, siteState } from "../../../store/site";

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

export const useDeleteExtension = () => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [, deleteExtension] = useDeleteExtensionMutation();

  const deleteExtensionFromSite = async (extensionId: string) => {
    try {
      // delete extension from database
      if (!siteSlug) return null;
      await deleteExtension({ id: extensionId, siteId: siteSlug });

      // delete extension from recoil site store
      if (!site) return null;

      setSite((site) => {
        if (site) {
          const newSite = { ...site };
          if (!newSite.extensions) return null;
          const index = newSite.extensions.findIndex(
            (extension) => extension.id === extensionId
          );
          if (index !== -1) {
            newSite.extensions.splice(index, 1);
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

  return deleteExtensionFromSite;
};
