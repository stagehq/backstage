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
  const [isIsrMode] = useRecoilState(isrState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(
    isIsrMode ? isrDataState : siteState(siteSlug)
  );
  const [, deleteExtension] = useDeleteExtensionMutation();

  const deleteExtensionFromSite = async (extensionId: string) => {
    console.log("ID: " + extensionId);
    
    try {
      
      if (!siteSlug) return null;
      if (!site || !site.extensions) return null;

      const currentExtensions = [...site.extensions];

      const index = currentExtensions.findIndex(
        (extension) => extension.id === extensionId
      );
      console.log(index);
      if (index !== -1) {
        currentExtensions.splice(index, 1);
        console.log(currentExtensions);
        setSite({ ...site, extensions: currentExtensions });

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
