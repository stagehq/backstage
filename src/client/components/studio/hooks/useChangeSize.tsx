import { useRecoilState, useRecoilValue } from "recoil";
import { Extension } from "../../../graphql/types.generated";
import { isrDataState, isrState } from "../../../store/isr";
import { siteSlugState, siteState } from "../../../store/site";

/**
 * Custom hook that allows for changing the size of a grid layout extension.
 *
 * @return {Function} changeExtensionSize - A function that allows for changing the size of a specific grid layout extension.
 *
 * @param {string} id - The id of the extension to be resized.
 * @param {1|2|3} size - The new size of the extension, with 1 being the smallest and 3 being the largest.
 */

export const useChangeExtensionSize = () => {
  const [isIsrMode] = useRecoilState(isrState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(isIsrMode ? isrDataState : siteState(siteSlug));

  const changeExtensionSize = (
    id: string,
    size: 1 | 2 | 3,
    gridRef: React.RefObject<HTMLDivElement>
  ) => {
    if (!site || !site?.extensions || !id) return null;

    const existingExtension = site.extensions.find(e => e.id === id);

    if (existingExtension) {
      const updatedExtension = { ...existingExtension, size };
      const index = site.extensions.indexOf(existingExtension);
      const newExtensions = [...site.extensions.slice(0, index), updatedExtension, ...site.extensions.slice(index + 1)];
      setSite({...site, extensions: newExtensions});
    } else {
      const newExtension: Extension = { ...site.extensions.find(e => e.id === id), size } as Extension;
      setSite({...site, extensions: [...site.extensions, newExtension]});
    }
    //setSite({...site, extensions: [...site.extensions, {...site.extensions.find(e => e.id === id) as Extension, size: size}]})
    //set new site state
    //update db
  };

  return changeExtensionSize;
};
