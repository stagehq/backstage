import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DndPage = () => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 3 },
    { i: "b", x: 1, y: 0, w: 1, h: 1, minW: 1, maxW: 3 },
    { i: "c", x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 3 }
  ];

  return <div className="w-full h-screen">
    <div className="sm:w-full md:w-[750] lg:w-[1200px] h-full bg-white mx-auto p-12">
      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1000, sm: 768, xs: 0}}
        cols={{ lg: 3, sm: 2, xs: 1}}
        rowHeight={300}
        width={1000}
      >
        <div key="a" className="bg-slate-100">a</div>
        <div key="b" className="bg-slate-100">b</div>
        <div key="c" className="bg-slate-100">c</div>
      </ResponsiveGridLayout>
    </div>
  </div>
}

export default DndPage;