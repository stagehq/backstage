import { PageHeader } from "@stagehq/ui";
import { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { siteSlugState, siteState } from "../../store/site";
import { themeState } from "../../store/ui/theme";
import { currentUserState } from "../../store/user";
import { demoData, initalData, LayoutType, updateLayout } from "../dnd/utils";

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioEditor = () => {
  const [items, setItems] = useState<LayoutType[]>(initalData);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      const newItems = updateLayout(items, itemsRef);
      setItems(newItems);
    }
  }, []);

  const [theme, setTheme] = useRecoilState(themeState);

  const user = useRecoilValue(currentUserState);

  const siteSlug = useRecoilValue(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  if(!site || !user) return null;

  return (
    <div className="w-full h-full">
      <div
        className="sm:w-full md:w-[750] lg:w-[1200px] h-full bg-white mx-auto p-12"
        ref={itemsRef}
      >
        <div className="p-8">
          <PageHeader
            title={site.tagline ? site.tagline : "Oops! No tagline found"}
            description={site?.bio ? site.bio : "Oops! No bio found"}
            image={user.image ? user.image : "https://via.placeholder.com/150"}
            lightMode={theme === "light" ? true : false}
            toggleLightMode={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </div>
        <ResponsiveGridLayout
          layouts={{ lg: items }}
          breakpoints={{ lg: 1000, sm: 768, xs: 0 }}
          cols={{ lg: 3, sm: 2, xs: 1 }}
          rowHeight={1}
          width={1000}
          margin={[24, 24]}
          onLayoutChange={(layout: LayoutType[]) =>
            setItems(updateLayout(layout, itemsRef))
          }
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

export default StudioEditor;
