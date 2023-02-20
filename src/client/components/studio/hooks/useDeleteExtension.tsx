import { decodeGlobalID } from "@pothos/plugin-relay";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDeleteExtensionMutation } from "../../../graphql/deleteExtension.generated";
import { useDeleteSiteImageMutation } from "../../../graphql/deleteSiteImage.generated";
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
  const [, deleteImage] = useDeleteSiteImageMutation();

  const deleteExtensionFromSite = async (extensionId: string) => {
    try {
      // delete extension from database
      if (!siteSlug) return null;
      // delete extension from recoil site store
      if (!site || !site.extensions || !site.images) return null;

      const newExtensions = [...site.extensions];
      const newImages = [...site.images];

      const extensionIndex = newExtensions.findIndex(
        (extension) => extension.id === extensionId
      );
      if (extensionIndex !== -1) {
        newExtensions.splice(extensionIndex, 1);
        setSite({ ...site, extensions: newExtensions });

        await deleteExtension({
          id: decodeGlobalID(extensionId).id,
          siteId: siteSlug,
        });
      }

      const imageIndex = newImages.findIndex(
        (image) => image.id === extensionId
      );
      if (imageIndex !== -1) {
        newImages.splice(imageIndex, 1);
        setSite({ ...site, images: newImages });

        await deleteImage({
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
