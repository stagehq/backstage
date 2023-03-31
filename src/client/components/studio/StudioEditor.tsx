import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getBaseUrl } from "../../../helper/getBaseUrl";
import { BlockProps } from "../../blocks/type";
import { siteSlugState, siteState } from "../../store/site";
import { currentUserState } from "../../store/user";
import Footer from "../Footer";
import { PageHeader } from "../PageHeader";
import EmptyState from "./EmptyState";

import { MuuriComponent, useData, useRefresh } from 'muuri-react';
import { Extension } from "../../graphql/types.generated";
import { DecoratedItem } from "muuri-react/dist/types/interfaces";
import clsx from "clsx";
import { useUpdateSiteLayoutsMutation } from "../../graphql/updateSiteLayouts.generated";
import { gridBreakpointState } from "../../store/ui/grid-dnd";

export const StudioEditor = () => {
  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  //local states
  const [components, setComponents] = useState<{
    [key: string]: FC<BlockProps>;
  } | undefined>(undefined);

  //recoil
  const user = useRecoilValue(currentUserState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);

  //mutation
  const [, updateSiteLayouts] = useUpdateSiteLayoutsMutation();

  useEffect(() => {
    //set extensions
    if (site?.extensions) {
      // console.log("test");
      site.extensions.forEach(async (extension) => {
        const Extension = dynamic(
          () => import(`../../blocks/${extension.storeExtension?.blockId}`)
        ) as FC<BlockProps>;
        if (Extension)
          setComponents((prevComponents) => ({
            ...prevComponents,
            [extension.id]: Extension,
          }));
      });
    }
  }, [site?.extensions]);

  //setbreakpoint
  useEffect(() => {
    if(window.innerWidth > 1200){
      breakpoint === "sm" && setBreakpoint("lg")
    }else{
      breakpoint === "lg" && setBreakpoint("sm")
    }
  }, [window.innerWidth, breakpoint])

  //only render when ...
  if (!site || !user || !site.layouts[breakpoint] || !site.extensions || !components) return null;
  
  //user needs to be owner of page
  if (!user.sites?.find((s) => s.subdomain === siteSlug))
  navigate(`/${siteSlug}`);

  window.dispatchEvent(new Event("resize"));

  return (
    <>
      <Head>
        <title>{site.tagline}</title>
        <meta name="description" content={site.bio ? site.bio : ""} />
        <meta name="og:type" content="website" />
        <meta name="robots" content="noindex,nofollow" />
        <meta
          property="og:image"
          content={`${getBaseUrl()}/api/og?tagline=${encodeURIComponent(
            site.tagline ? site.tagline : ""
          )}&bio=${encodeURIComponent(
            site.bio ? site.bio : ""
          )}&image=${encodeURIComponent(
            "https://" + site.image ? "https://" + site.image : ""
          )}`}
        />
        <meta property="og:title" content={site.tagline ? site.tagline : ""} />
        <meta property="og:description" content={site.bio ? site.bio : ""} />
        <meta property="og:url" content={getBaseUrl() + "/" + site.subdomain} />
      </Head>
      <div className="block h-full w-full">
        <div className= "h-full w-full"
            tabIndex= {-1}
            onClick={(event) => event.stopPropagation()}
        >
          <div className="flex h-full flex-col justify-between overflow-x-hidden overflow-y-scroll bg-white @container dark:bg-zinc-900">
            <div className="h-fit w-full max-w-[1200px] p-8 pb-24 sm:p-16 lg:mx-auto xl:p-4">
              <div className="py-8">
                <PageHeader />
              </div>
              {site.extensions ? (
                <div ref={itemsRef} className="py-4 -mx-4">
                  <MuuriComponent
                    id={site.id}
                    dragFixed
                    dragEnabled 
                    dragSortPredicate={{
                      action: "swap",
                      threshold: 30,
                      migrateAction: "swap",
                    }}
                    dragPlaceholder={{
                      enabled: true,
                      createElement: function () {
                        const parentDiv = document.createElement('div');
                        parentDiv.classList.add('w-full', 'h-full', 'p-4', 'z-0');
                        const childDiv = document.createElement('div');
                        childDiv.classList.add('w-full', 'h-full', 'bg-zinc-50', 'rounded-xl');
                        parentDiv.appendChild(childDiv);
                        return parentDiv;
                      },
                    }}
                    dragSortHeuristics={{
                      sortInterval: 10
                    }}
                    onSort={() => window.dispatchEvent(new Event("resize"))}
                    onDragEnd={function (item) {
                      const grid = item.getGrid();
                      const items = grid.getItems();
                      const keys = items.map((item) => item.getKey());
                      if(site?.subdomain){
                        updateSiteLayouts({
                          id: site.subdomain,
                          layouts: JSON.stringify({...site.layouts, [breakpoint]: keys}),
                        }).then((res) => {
                          console.log(res);
                        });
                      }
                      setSite({...site, layouts: {...site.layouts, [breakpoint]: keys}});
                    }}
                    sort={site.layouts[breakpoint]}
                    layout={{
                      fillGaps: true,
                      horizontal: false,
                      alignRight: false,
                      alignBottom: false,
                      rounding: true,
                    }}
                  >
                    {site.extensions.map((extension) => {
                      console.log(extension);
                      return <SingleBlock key={extension.id} components={components} itemsRef={itemsRef} extension={extension} breakpoint={breakpoint} size={extension.size ? extension.size : 3}/>
                    })}
                  </MuuriComponent>
                </div>
              ) : (
                <EmptyState />
              )}
            </div>
            <Footer socials={site.socials} />
          </div>
        </div>
      </div>
    </>
  );
};
interface SingleBlockProps {
  components: {[key: string]: FC<BlockProps>}
  extension: Extension
  itemsRef: React.RefObject<HTMLDivElement>
  breakpoint: "lg" | "sm"
  size: number
}

const SingleBlock: FC<SingleBlockProps> = ({extension, components, itemsRef, breakpoint, size}) => {
  const Block = components[extension.id] as FC<BlockProps>;
  useRefresh([extension]);

  if(!Block || (size !== 1 && size !== 2 && size !== 3)) return (<div />);
  return (
    <div key={extension.id} className={clsx("item z-10", getSizeStyling(breakpoint, size))} data-id={extension.id}>
      <div className="item-content p-4 w-full h-auto">
        <Block
          gridRef={itemsRef}
          extension={extension}
          size={size}
          isEditable={true}
        />
      </div>
    </div> 
  )
}

const getSizeStyling = (breakpoint: "sm" | "lg", size: 1 | 2 | 3 ) => {
  if(breakpoint === "sm"){
    return "w-[calc(100%_-_32px)]"
  }else{
    switch(size){
      case 1:
        return "w-[calc(35%_-_32px)]"
      case 2:
        return "w-[calc(67.5%_-_32px)]"
      case 3:
        return "w-[calc(100%_-_32px)]"
      default:
        return "w-[calc(100%_-_32px)]"
    }
  }
}