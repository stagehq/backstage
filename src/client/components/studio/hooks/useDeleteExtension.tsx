import { decodeGlobalID } from "@pothos/plugin-relay";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDeleteExtensionMutation } from "../../../graphql/deleteExtension.generated";
import { isrDataState, isrState } from "../../../store/isr";
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
  const [isIsrMode,] = useRecoilState(isrState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(isIsrMode ? isrDataState : siteState(siteSlug));
  const [, deleteExtension] = useDeleteExtensionMutation();

  const deleteExtensionFromSite = async (extensionId: string) => {
    try {
      // delete extension from database
      if (!siteSlug) return null;
      // delete extension from recoil site store
      if (!site || !site.extensions) return null;

      const newExtensions = [...site.extensions];

      const extensionIndex = newExtensions.findIndex(
        (extension) => extension.id === extensionId
      );
      if (extensionIndex !== -1) {
        newExtensions.splice(extensionIndex, 1);
        setSite({...site});
        setSite({ ...site, extensions: newExtensions });

        await deleteExtension({
          id: decodeGlobalID(extensionId).id,
          siteId: siteSlug,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return deleteExtensionFromSite;
};
