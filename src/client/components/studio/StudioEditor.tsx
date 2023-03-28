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

import { MuuriComponent, useRefresh } from 'muuri-react';
import { Extension } from "../../graphql/types.generated";
import { DecoratedItem } from "muuri-react/dist/types/interfaces";
import clsx from "clsx";
import { useUpdateSiteLayoutsMutation } from "../../graphql/updateSiteLayouts.generated";

export const StudioEditor = () => {
  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  //local state items
  const [items, setItems] = useState<Extension[] | undefined>(undefined);
  const [components, setComponents] = useState<{
    [key: string]: FC<BlockProps>;
  }>({});
  const [breakpoint, setBreakpoint] = useState<"sm" | "lg">("sm");

  //recoil
  const user = useRecoilValue(currentUserState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

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

  useEffect(() => {
    if(window.innerWidth > 1200){
      breakpoint === "sm" && setBreakpoint("lg")
    }else{
      breakpoint === "lg" && setBreakpoint("sm")
    }
  }, [window.innerWidth, breakpoint])

  //load items state
  useEffect(() => {
    if(site?.extensions && components){
      setItems(site.extensions);
    }
  }, [site?.extensions, components])

  //user needs to be owner of page
  if (!site || !user || !site.layouts[breakpoint]) return null;
  if (!user.sites?.find((s) => s.subdomain === siteSlug))
    navigate(`/${siteSlug}`);

  window.dispatchEvent(new Event("resize"));

  console.log(site.layouts[breakpoint]);

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
              {items ? (
                <div ref={itemsRef} className="py-4 -mx-4">
                  <MuuriComponent 
                    dragEnabled 
                    dragFixed
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
                    sort={site.layouts.breakpoint}
                    layout={{
                      fillGaps: true,
                      horizontal: false,
                      alignRight: false,
                      alignBottom: false,
                      rounding: true,
                    }}
                  >
                    {items.map((extension) => 
                      <SingleBlock key={extension.id} components={components} itemsRef={itemsRef} extension={extension} breakpoint={breakpoint}/>
                    )}
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
}

const SingleBlock: FC<SingleBlockProps> = ({extension, components, itemsRef, breakpoint}) => {
  const Block = components[extension.id] as FC<BlockProps>;
  useRefresh([extension]);

  if(!Block) return (<div />);
  return (
    <div key={extension.id} className={clsx("item z-10", breakpoint === "sm" ? "w-[calc(100%_-_32px)]" : "w-[calc(33%_-_32px)]")} data-id={extension.id}>
      <div className="item-content p-4 w-full h-auto">
        <Block
          gridRef={itemsRef}
          extension={extension}
          size={3}
          isEditable={true}
        />
      </div>
    </div> 
  )
}