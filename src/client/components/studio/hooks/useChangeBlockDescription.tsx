import { decodeGlobalID } from "@pothos/plugin-relay";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Site } from "../../../graphql/types.generated";
import { useUpdateBlockDescriptionMutation } from "../../../graphql/updateExtensionDescription.generated";
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

export const useChangeBlockDescription = () => {
  const [isIsrMode,] = useRecoilState(isrState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(isIsrMode ? isrDataState : siteState(siteSlug));

  const [, updateBlockDescription] = useUpdateBlockDescriptionMutation();

  const debounceChangeBlockDescription = useCallback(
    debounce(async (id, description) => {
      if (id) {
        await updateBlockDescription({
          id: decodeGlobalID(id).id,
          description,
        });
      }
    }, 1000),
    [] // will be created only once initially
  );

  const changeBlockDescription = async (id: string, description: string) => {
    // update extension in recoil site store with id with immutability
    console.log("update Block Description");
    console.log(description);
    setSite(() => {
      const newSite = { ...site };
      const newBlocks = newSite?.extensions?.map((extension) => {
        if (extension.id === id) {
          return {
            ...extension,
            description,
          };
        }
        return extension;
      });
      newSite.extensions = newBlocks;
      return newSite as Site;
    });

    // update extension in database
    await debounceChangeBlockDescription(id, description);
  };

  return changeBlockDescription;
};
