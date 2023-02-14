import dynamic from "next/dynamic";
import { FC, useEffect, useRef, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { BlockProps } from "../../blocks/type";
import { siteSlugState, siteState } from "../../store/site";
import { gridBreakpointState } from "../../store/ui/grid-dnd";
import { currentUserState } from "../../store/user";
import { PageHeader } from "../PageHeader";
import EmptyState from "./EmptyState";
import { useHandleLayoutChange } from "./hooks/useHandleLayoutChange";

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioEditor = () => {
  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  //recoil
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);
  const user = useRecoilValue(currentUserState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [components, setComponents] = useState<{
    [key: string]: FC<BlockProps>;
  }>({});
  const [initialCalculated, setInitialCalculated] = useState(false);
  const [draggedBefore, setDraggedBefore] = useState(false);

  const onDrag = () => {
    if (!draggedBefore) {
      setDraggedBefore(true);
    }
  };

  //hook
  const handleLayoutChange = useHandleLayoutChange();

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

      setInitialCalculated(true);

      setTimeout(() => {
        if (itemsRef.current) itemsRef.current.classList.add("animated");
      }, 300);
    }, 100);
  }, [site?.extensions]);

  useEffect(() => {
    if (itemsRef.current) itemsRef.current.classList.remove("animated");
  }, []);

  if (!site || !user || !initialCalculated) return null;

  return (
    <div className="h-full w-full">
      <div className="h-full overflow-x-hidden overflow-y-scroll bg-white @container dark:bg-zinc-900">
        <div className="min-h-full w-full max-w-6xl p-12 pb-24 lg:mx-auto">
          <div className="p-8">
            <PageHeader />
          </div>
          {site.extensions && site.extensions.length > 0 ? (
            <div ref={itemsRef} className="py-4">
              <ResponsiveGridLayout
                layouts={site.layouts ? site.layouts : {}}
                breakpoints={{ lg: 991, md: 768, sm: 0 }}
                cols={{ lg: 3, md: 2, sm: 1 }}
                rowHeight={1}
                width={1000}
                margin={[32, 32]}
                isResizable={false}
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
                onDrag={onDrag}
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
                        <div
                          key={extension.id}
                          id={extension.id}
                          onClick={(e) => {
                            if (draggedBefore) {
                              e.stopPropagation();
                              e.preventDefault();
                              setDraggedBefore(false);
                            }
                          }}
                        >
                          <Extension
                            gridRef={itemsRef}
                            extension={extension}
                            size={size}
                            isEditable={true}
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
  );
};

export default StudioEditor;
