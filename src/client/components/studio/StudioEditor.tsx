import clsx from "clsx";
import dynamic from "next/dynamic";
import { FC, useEffect, useRef } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { BlockProps } from "../../blocks/type";
import { useUpsertSiteMutation } from "../../graphql/upsertSite.generated";
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

  const [, upsertSite] = useUpsertSiteMutation();

  const updateHeight = () => {
    if (!layouts) return;

    const newLayout = updateLayout(layouts[breakpoint], itemsRef);

    if (
      layouts &&
      layouts[breakpoint] !== newLayout &&
      site?.tagline &&
      site?.bio &&
      site?.subdomain
    ) {
      setLayouts((layouts) => {
        return { ...layouts, [breakpoint]: newLayout };
      });

      /* TODO: This has to be executed after the layout is updated and with a 1sec threshold. */
      upsertSite({
        subdomain: site.subdomain,
        tagline: site.tagline,
        bio: site.bio,
        layouts: JSON.stringify({ ...layouts, [breakpoint]: newLayout }),
      });
    }
  };

  useEffect(() => {
    if (site?.layouts && document.readyState === "complete") {
      setLayouts(site.layouts);
      updateHeight();
    }
  }, []);

  // if (!site || !layouts || !user) return null;
  if (!site || !user) return null;

  return (
    <div className={clsx(theme === "dark" && "dark", "w-full h-full ")}>
      <div className="@container overflow-scroll h-full bg-white dark:bg-zinc-900">
        <div
          className="w-full mx-auto max-w-6xl lg: h-full p-12"
          ref={itemsRef}
        >
          <div className="p-8">
            <PageHeader />
          </div>

          {layouts && site.extensions && site.extensions?.length > 0 ? (
            <ResponsiveGridLayout
              layouts={layouts}
              breakpoints={{ lg: 991, md: 768, sm: 0 }}
              cols={{ lg: 3, md: 2, sm: 1 }}
              rowHeight={1}
              width={1000}
              margin={[24, 24]}
              isResizable={false}
              measureBeforeMount={true}
              onWidthChange={() => {
                updateHeight();
              }}
              onBreakpointChange={(breakpoint) => {
                setBreakpoint(breakpoint);
              }}
              onLayoutChange={(layout: Layout[], layouts: Layouts) => {
                if (breakpoint) {
                  const currentLayout = layouts[breakpoint];
                  const adjustedLayout = updateLayout(currentLayout, itemsRef);
                  layouts[breakpoint] = adjustedLayout;
                } else {
                  updateLayout(layout, itemsRef);
                }
                setLayouts(layouts);
              }}
            >
              {site.extensions.map((extension, index) => {
                const Extension = dynamic(
                  () =>
                    import(`../../blocks/${extension.storeExtension?.blockId}`)
                ) as FC<BlockProps>;
                return (
                  <div key={extension.id} id={extension.id}>
                    <Extension
                      extension={extension}
                      size={1}
                      isEditable={true}
                    />
                  </div>
                );
              })}
            </ResponsiveGridLayout>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioEditor;
