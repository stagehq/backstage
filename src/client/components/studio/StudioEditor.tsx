import clsx from "clsx";
import { log } from "console";
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
import { PageHeader } from "../PageHeader";
import EmptyState from "./EmptyState";

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioEditor = () => {
  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  //recoil
  const [layouts, setLayouts] = useRecoilState(gridLayoutState);
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);
  const [theme, setTheme] = useRecoilState(themeState);
  const user = useRecoilValue(currentUserState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  const [, updateSiteLayouts] = useUpdateSiteLayoutsMutation();

  //single source of change layouts
  const handleLayoutChange = async (newlayouts?: Layouts) => {
    let currentLayouts = newlayouts ? newlayouts : layouts;
    if(!currentLayouts) return null;

    //calculate height
    await new Promise(resolve => setTimeout(() => {
      if(!currentLayouts) return null;
      let index = 0;
      const newItems = [...currentLayouts[breakpoint]];

      if (itemsRef.current?.children[0].children) {    
        for (const element of itemsRef.current.children[0].children) {
          const content = element.children[0] as HTMLDivElement;
          if (content.offsetHeight !== 0) {
            const newHeight = content.offsetHeight / 24;
            newItems[index] = { ...newItems[index], h: newHeight, minH: newHeight };    
            index++;
          }
        }
      }
      currentLayouts = Object.assign({}, currentLayouts, { [breakpoint]: newItems });
      resolve(true);
    }, 100))
    
    //update layout
    setLayouts(currentLayouts);

    //update db
    // if (siteSlug && currentLayouts) {
    //   await updateSiteLayouts({
    //     id: siteSlug ? siteSlug : "",
    //     layouts: JSON.stringify(currentLayouts),
    //   });
    // }
  }

  //set inital Layout
  useEffect(() => {
    if (site?.layouts && document.readyState === "complete") {
      window.dispatchEvent(new Event("resize"));
      console.log("inital change")
      handleLayoutChange(site.layouts);
    }
  }, []);

  console.log("rerender", layouts);

  if (!site || !user) return null;

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
                  layouts={layouts ? layouts : {}}
                  breakpoints={{ lg: 991, md: 768, sm: 0 }}
                  cols={{ lg: 3, md: 2, sm: 1 }}
                  rowHeight={1}
                  width={1000}
                  margin={[24, 24]}
                  isResizable={false}
                  measureBeforeMount={true}
                  onWidthChange={() => {
                    console.log("Widtch changed");
                    handleLayoutChange()
                  }}
                  onBreakpointChange={(breakpoint) => {
                    console.log("Breakpoint changed");
                    setBreakpoint(breakpoint);
                  }}
                  onLayoutChange={(layout: Layout[], layouts: Layouts) => {  
                    console.log("layout changed");                  
                    handleLayoutChange(layouts)
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
                      // console.log(layouts, extension);
                      
                      if(!breakpoint) return null;
                      // const layoutFound = layouts ? layouts[breakpoint].find((layout: Layout) => layout.i === extension.id) : null;
                      // const size = layouts ? layouts[breakpoint].find((layout: Layout) => layout.i === extension.id)?.w as 1 | 2 | 3 : 3;

                      return (
                        <div key={extension.id} id={extension.id}>
                          <Extension
                            gridRef={itemsRef}
                            extension={extension}
                            //size={layoutFound ? size : 3}
                            size={3}
                            isEditable={true}
                          />
                        </div>
                      );
                    })}
                </ResponsiveGridLayout>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioEditor;
