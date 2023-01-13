import clsx from "clsx";
import dynamic from "next/dynamic";
import { FC, useEffect, useRef } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { BlockProps } from "../../blocks/type";
import { useUpdateSiteLayoutsMutation } from "../../graphql/updateSiteLayouts.generated";
import { siteSlugState, siteState } from "../../store/site";
import { gridBreakpointState, gridLayoutState } from "../../store/ui/grid-dnd";
import { themeState } from "../../store/ui/theme";
import { currentUserState } from "../../store/user";
import { updateLayout } from "../dnd/utils";
import { PageHeader } from "../PageHeader";

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioEditor = () => {
  const [layouts, setLayouts] = useRecoilState(gridLayoutState);
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);
  const itemsRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useRecoilState(themeState);

  const user = useRecoilValue(currentUserState);

  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  useEffect(() => {
    console.log(site);
  }, [site]);

  const [, updateSiteLayouts] = useUpdateSiteLayoutsMutation();

  const updateBreakpointLayoutHeight = (layouts: Layouts) => {
    if (!layouts) return;
    const newLayout = updateLayout(layouts[breakpoint], itemsRef);
    if (layouts && layouts[breakpoint] !== newLayout) {
      setLayouts((layouts) => {
        return { ...layouts, [breakpoint]: newLayout };
      });
    }
  };

  useEffect(() => {
    if (site?.layouts && document.readyState === "complete") {
      updateBreakpointLayoutHeight(site.layouts);
    }
  }, []);

  useEffect(() => {
    if (siteSlug && layouts) {
      updateSiteLayouts({
        id: siteSlug ? siteSlug : "",
        layouts: JSON.stringify(layouts),
      });
    }
  }, [layouts, siteSlug, updateSiteLayouts]);

  useEffect(() => {
    if (layouts) {
      window.dispatchEvent(new Event("resize"));
    }
  }, [layouts]);

  if (!site || !layouts || !user) return null;

  return (
    <div className={clsx(theme === "dark" && "dark", "h-full w-full ")}>
      <div className="h-full overflow-scroll bg-white @container dark:bg-zinc-900">
        <div className="lg: mx-auto h-full w-full max-w-6xl p-12">
          <div className="p-8">
            <PageHeader />
          </div>
          {site.extensions && site.extensions.length > 0 ? (
            <div ref={itemsRef}>
              <ResponsiveGridLayout
                layouts={layouts}
                breakpoints={{ lg: 991, md: 768, sm: 0 }}
                cols={{ lg: 3, md: 2, sm: 1 }}
                rowHeight={1}
                width={1000}
                margin={[24, 24]}
                isResizable={false}
                measureBeforeMount={true}
                onDragStop={() => {
                  updateBreakpointLayoutHeight(layouts);
                }}
                onWidthChange={() => {
                  updateBreakpointLayoutHeight(layouts);
                }}
                onBreakpointChange={(breakpoint) => {
                  setBreakpoint(breakpoint);
                  updateBreakpointLayoutHeight(layouts);
                }}
                onLayoutChange={(layout: Layout[], layouts: Layouts) => {
                  setLayouts(layouts);
                  updateBreakpointLayoutHeight(layouts);
                }}
              >
                {site.extensions &&
                  site.extensions.map((extension, index) => {
                    const Extension = dynamic(
                      () =>
                        import(
                          `../../blocks/${extension.storeExtension?.blockId}`
                        )
                    ) as FC<BlockProps>;

                    if (!Extension) return null;

                    return (
                      <div key={extension.id} id={extension.id}>
                        <Extension
                          gridRef={itemsRef}
                          extension={extension}
                          size={layouts[breakpoint].find((layout: Layout) => layout.i === extension.id)?.w as 1 | 2 | 3}
                          isEditable={true}
                        />
                      </div>
                    );
                  })}
              </ResponsiveGridLayout>
            </div>
          ) : (
            <span>add extension</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioEditor;
