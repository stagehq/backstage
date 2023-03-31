import { decodeGlobalID } from "@pothos/plugin-relay";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDeleteExtensionMutation } from "../../../graphql/deleteExtension.generated";
import { Extension } from "../../../graphql/types.generated";
import { isrDataState, isrState } from "../../../store/isr";
import { siteSlugState, siteState } from "../../../store/site";
// import { gridLayoutState } from "../../../store/ui/grid-dnd";

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

  const deleteExtensionFromSite = (extensionId: string) => {
    try {
      if (!siteSlug || !site || !site.extensions) return null;
      const newExtensions: Extension[] = [...site.extensions].filter((e) => e.id !== extensionId);
      setSite({ ...site, extensions: newExtensions });

      // await deleteExtension({
      //   id: decodeGlobalID(extensionId).id,
      //   siteId: siteSlug,
      // });

    } catch (error) {
      // console.log(error);
    }
  };

  return deleteExtensionFromSite;
};
