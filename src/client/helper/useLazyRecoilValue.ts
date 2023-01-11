import { Loadable, useRecoilState } from "recoil";
import { Site } from "../graphql/types.generated";
import { staleSiteState } from "../store/site";

export const useLazyRecoilValue = (loadable: Loadable<Site | null>) => {
  const [site, setSite] = useRecoilState(staleSiteState);
  if (loadable.state === "hasValue") {
    setSite(loadable.contents);
    return loadable.contents;
  } else {
    return site;
  }
};
