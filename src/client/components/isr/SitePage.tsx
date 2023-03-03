import { encodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, useEffect, useRef, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState } from "recoil";
import { getBaseUrl } from "../../../helper/getBaseUrl";
import { BlockProps } from "../../blocks/type";
import { Site } from "../../graphql/types.generated";
import { isrDataState, isrState } from "../../store/isr";
import { gridBreakpointState } from "../../store/ui/grid-dnd";
import { themeState } from "../../store/ui/theme";
import Footer from "../Footer";
import { PageHeader } from "../PageHeader";
import EmptyState from "../studio/EmptyState";
import { useHandleLayoutChange } from "../studio/hooks/useHandleLayoutChange";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface SitePageProps {
  data: Site | null;
}

const SitePage: FC<SitePageProps> = ({ data }) => {
  //recoil
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [site, setSite] = useRecoilState(isrDataState);
  const [, setIsrMode] = useRecoilState(isrState);

  useEffect(() => {
    setTheme("light");
    setIsrMode(true);
    setSite(data);
  }, [data]);

  const [components, setComponents] = useState<{
    [key: string]: FC<BlockProps>;
  }>({});

  //hook
  const handleLayoutChange = useHandleLayoutChange();

  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(site?.extensions);
    if (site?.layouts) {
      //set extensions
      if (site?.extensions && site.layouts) {
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
    }
  }, [site?.extensions]);

  useEffect(() => {
    if (itemsRef.current) {
      itemsRef.current.classList.remove("animated");
    }
  }, []);

  //window.dispatchEvent(new Event("resize"));

  if (!site) return null;

  console.log(site.layouts);

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
          <div className="min-h-full w-full max-w-[1200px] p-0 pb-24 sm:p-4 lg:mx-auto ">
            <div className="py-8">
              <PageHeader disabled />
            </div>
            {site.extensions && site.extensions.length > 0 ? (
              <div ref={itemsRef}>
                <ResponsiveGridLayout
                  layouts={site.layouts}
                  breakpoints={{ lg: 991, md: 768, sm: 0 }}
                  cols={{ lg: 3, md: 2, sm: 1 }}
                  rowHeight={1}
                  width={1000}
                  margin={[32, 32]}
                  containerPadding={[0, 32]}
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
                      console.log("extensions", site.extensions);
                      console.log("components", components);
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
                          <div
                            key={encodeGlobalID("Extension", extension.id)}
                            id={encodeGlobalID("Extension", extension.id)}
                          >
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
          <Footer socials={site.socials} />
        </div>
      </div>
    </>
  );
};

export default SitePage;
