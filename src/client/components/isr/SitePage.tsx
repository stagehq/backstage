import clsx from "clsx";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, useEffect, useRef, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { getBaseUrl } from "../../../helper/getBaseUrl";
import { BlockProps } from "../../blocks/type";
import { siteSlugState, siteState } from "../../store/site";
import { gridBreakpointState } from "../../store/ui/grid-dnd";
import { themeState } from "../../store/ui/theme";
import { PageHeader } from "../PageHeader";
import EmptyState from "../studio/EmptyState";
import { useHandleLayoutChange } from "../studio/hooks/useHandleLayoutChange";

const ResponsiveGridLayout = WidthProvider(Responsive);

const SitePage: FC = () => {
  //recoil
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);
  const [theme] = useRecoilState(themeState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [components, setComponents] = useState<{
    [key: string]: FC<BlockProps>;
  }>({});
  const [initialCalculated, setInitialCalculated] = useState(false);

  //hook
  const handleLayoutChange = useHandleLayoutChange();

  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (site?.layouts == null) {
      console.log("empty");
      setInitialCalculated(true);

      setTimeout(() => {
        if (itemsRef.current) itemsRef.current.classList.add("animated");
      }, 300);
    }
    //set extensions
    if (site?.extensions) {
      console.log("test");
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
    setTimeout(async () => {
      if (!site?.layouts || site.layouts == null) return null;
      await handleLayoutChange(itemsRef, site.layouts);
      console.log("ready");
      setInitialCalculated(true);

      setTimeout(() => {
        if (itemsRef.current) itemsRef.current.classList.add("animated");
      }, 300);
    }, 100);
  }, [site?.extensions]);

  useEffect(() => {
    if (itemsRef.current) {
      itemsRef.current.classList.remove("animated");
    }
  }, []);

  window.dispatchEvent(new Event("resize"));

  console.log("site", site);

  if (!site || !initialCalculated) return null;

  return (
    <>
      <Head>
        <title>{site.tagline}</title>
        <meta name="description" content={site.bio ? site.bio : ""} />
        <meta name="og:type" content="website" />
        <meta name="robots" content="index,follow" />
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
      <div className={clsx(theme === "dark" && "dark", "h-screen w-full ")}>
        <div className="h-full overflow-scroll bg-white @container dark:bg-zinc-900">
          <div className="min-h-full w-full max-w-6xl p-0 pb-24 sm:p-4 lg:mx-auto lg:p-12">
            <div className="p-8">
              <PageHeader disabled />
            </div>
            {site.extensions && site.extensions.length > 0 ? (
              <div ref={itemsRef}>
                <ResponsiveGridLayout
                  layouts={site.layouts ? site.layouts : {}}
                  breakpoints={{ lg: 991, md: 768, sm: 0 }}
                  cols={{ lg: 3, md: 2, sm: 1 }}
                  rowHeight={1}
                  width={1000}
                  margin={[32, 32]}
                  isResizable={false}
                  isDraggable={false}
                  measureBeforeMount={true}
                  onWidthChange={() => {
                    console.log("Widtch changed");
                    handleLayoutChange(itemsRef);
                  }}
                  onBreakpointChange={(breakpoint) => {
                    console.log("Breakpoint changed");
                    setBreakpoint(breakpoint);
                  }}
                  onLayoutChange={(layout: Layout[], layouts: Layouts) => {
                    console.log("layout changed");
                    handleLayoutChange(itemsRef, layouts);
                  }}
                >
                  {site.extensions &&
                    site.extensions.map((extension, index) => {
                      if (components[extension.id]) {
                        const Extension = components[
                          extension.id
                        ] as FC<BlockProps>;
                        if (!breakpoint && !site.layouts) return null;
                        const size = site.layouts
                          ? site.layouts[breakpoint]
                            ? (site.layouts[breakpoint].find(
                                (layout: Layout) => layout.i === extension.id
                              )?.w as 1 | 2 | 3)
                            : 3
                          : 3;

                        return (
                          <div key={extension.id} id={extension.id}>
                            <Extension
                              gridRef={itemsRef}
                              extension={extension}
                              size={size}
                              isEditable={false}
                            />
                          </div>
                        );
                      }
                    })}
                </ResponsiveGridLayout>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SitePage;
