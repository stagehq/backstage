import { decodeGlobalID } from "@pothos/plugin-relay";
import { useRecoilState, useRecoilValue } from "recoil";
import { Site } from "../../../graphql/types.generated";
import { useUpdateBlockTitleMutation } from "../../../graphql/updateExtensionTitle.generated";
import { siteSlugState, siteState } from "../../../store/site";

/**
 * @function
 * @name useChangeBlockTitle
 *
 * @description
 * A custom hook that updates the title of an extension in the database and in the Recoil state.
 *
 * @returns {Function} changeBlockTitle - A function that takes in an extension id and a title, and updates the title of the extension in the database and in the Recoil state.
 */

export const useChangeBlockTitle = () => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  const [, updateBlockTitle] = useUpdateBlockTitleMutation();

  const changeBlockTitle = async (id: string, title: string) => {
    // update extension in database
    await updateBlockTitle({
      id: decodeGlobalID(id).id,
      title,
    });
    
    // update extension in recoil site store with id with immutability
    setSite((prevSite) => {
      const newSite = { ...prevSite };
      const newExtensions = newSite.extensions?.map((extension) => {
        if (extension.id === id) {
          return { ...extension, title };
        }
        return extension;
      });
      newSite.extensions = newExtensions;
      return newSite;
    });
  };

  return changeBlockTitle;
};
