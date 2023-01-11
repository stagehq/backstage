import { useRecoilState, useRecoilValue } from "recoil";
import { useDeleteExtensionMutation } from "../../../graphql/deleteExtension.generated";
import { siteSlugState, siteState } from "../../../store/site";

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
