import { Site } from "../graphql/types.generated";

export const useLazyRecoilValue = (site: Site | null) => {
  // // console.log("lazy");
  // const [site, setSite] = useRecoilState(staleSiteState);
  // // console.log(site);
  // // console.log(loadable.contents);
  // if (loadable.state === "hasValue") {
  //   setSite(loadable.contents);
  //   return loadable.contents;
  // } else {
  //   return site;
  // }
  return site;
};
