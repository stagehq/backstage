import { decodeGlobalID } from "@pothos/plugin-relay";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Site } from "../../../graphql/types.generated";
import { useUpdateBlockTitleMutation } from "../../../graphql/updateExtensionTitle.generated";
import { isrDataState, isrState } from "../../../store/isr";
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
  const [isIsrMode] = useRecoilState(isrState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(
    isIsrMode ? isrDataState : siteState(siteSlug)
  );

  const [, updateBlockTitle] = useUpdateBlockTitleMutation();

  const debounceChangeBlockTitle = useCallback(
    debounce(async (id, title) => {
      if (id && title) {
        await updateBlockTitle({
          id: decodeGlobalID(id).id,
          title,
        });
      }
    }, 1000),
    [] // will be created only once initially
  );

  const changeBlockTitle = async (id: string, title: string) => {
    // update extension in recoil site store with id with immutability
    console.log("update Block Title");
    setSite(() => {
      const newSite = { ...site };
      const newBlocks = newSite?.extensions?.map((extension) => {
        if (extension.id === id) {
          return {
            ...extension,
            title,
          };
        }
        return extension;
      });
      newSite.extensions = newBlocks;
      return newSite as Site;
    });

    // update extension in database
    await debounceChangeBlockTitle(id, title);
  };

  return changeBlockTitle;
};
