import { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Layout from "../layouts/Login";

const ResponsiveGridLayout = WidthProvider(Responsive);

const data = {
  title: "Title",
  subtitle: "I have a similar situation where I'm trying to integrate the react-grid-layout into my project with a variable number of widgets. Each widget loads with a spinner and then fetches data from different endpoints that result in variable size content."
}

const DndPage = () => {
  const [items, setItems] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 100/24, minW: 1, maxW: 3 },
    { i: "b", x: 1, y: 0, w: 1, h: 100/24, minW: 1, maxW: 3 },
    { i: "c", x: 2, y: 0, w: 1, h: 100/24, minW: 1, maxW: 3 }
  ]);

  const itemsRef = useRef();

  const updateLayout = (layout) => {
    let index = 0;
    const newItems = [...layout];
    
    if(document.readyState === "complete"){
      for (const element of itemsRef.current.children[0].children) {
        if(element.children[0].offsetHeight !== 0){
          const newHeight = element.children[0].offsetHeight / 24;
          newItems[index] = { ...newItems[index], h: newHeight + 0.75 };
          index++;
        }
      }
    }
    return newItems;
  }

  useEffect(() => {
    if(document.readyState === "complete" && items != null){
      const newItems = updateLayout(items);
      setItems(newItems);
    }
  }, [itemsRef]);

  return <div className="w-full h-screen">
    <div className="sm:w-full md:w-[750] lg:w-[1200px] h-full bg-white mx-auto p-12" ref={itemsRef}>
      <ResponsiveGridLayout
        layouts={{ lg: items }}
        breakpoints={{ lg: 1000, sm: 768, xs: 0}}
        cols={{ lg: 3, sm: 2, xs: 1}}
        rowHeight={1}
        width={1000}
        margin={[24, 24]}
        onLayoutChange={(layout) => setItems(updateLayout(layout))}
      >
        <div key="a" id="a">
          <div className="bg-slate-50 p-8">
            <div>{data.title}</div>
            <div>{data.subtitle}</div>
          </div>
        </div>
        <div key="b" id="b" className="bg-slate-50">
          <div className="bg-slate-50 p-8">
            <div>{data.title}</div>
            <div>{data.subtitle}</div>
          </div>
        </div>
        <div key="c" id="c" className="bg-slate-50">
          <div className="bg-slate-50 p-8">
            <div>{data.title}</div>
            <div>{data.subtitle}</div>
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  </div>
}

export default DndPage;