import { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { demoData, initalData, LayoutType, updateLayout } from "./utils";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DndPage = () => {
  const [items, setItems] = useState<LayoutType[]>(initalData);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      const newItems = updateLayout(items, itemsRef);
      setItems(newItems);
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <div
        className="sm:w-full md:w-[750] lg:w-[1200px] h-full bg-white mx-auto p-12"
        ref={itemsRef}
      >
        <ResponsiveGridLayout
          layouts={{ lg: items }}
          breakpoints={{ lg: 1280, sm: 768, xs: 0 }}
          cols={{ lg: 3, sm: 2, xs: 1 }}
          rowHeight={1}
          width={1280}
          margin={[24, 24]}
          onLayoutChange={(layout: LayoutType[]) =>
            setItems(updateLayout(layout, itemsRef))
          }
          containerPadding={[0, 0]}
        >
          <div key="a" id="a" className="bg-slate-50">
            <div className="p-8">
              <div>{demoData.title}</div>
              <div>{demoData.subtitle}</div>
            </div>
          </div>
          <div key="b" id="b" className="bg-slate-50">
            <div className="p-8">
              <div>{demoData.title}</div>
              <div>{demoData.subtitle}</div>
            </div>
          </div>
          <div key="c" id="c" className="bg-slate-50">
            <div className="p-8">
              <div>{demoData.title}</div>
              <div>{demoData.subtitle}</div>
            </div>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default DndPage;
