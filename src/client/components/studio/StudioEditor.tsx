import { PageHeader } from "@stagehq/ui";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { FC, useEffect, useRef } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { BlockProps } from "../../blocks/type";
import { siteSlugState, siteState } from "../../store/site";
import { gridBreakpointState, gridLayoutState } from "../../store/ui/grid-dnd";
import { themeState } from "../../store/ui/theme";
import { currentUserState } from "../../store/user";
import { updateLayout } from "../dnd/utils";
import { useChangeExtensionSize } from "./hooks/useChangeSize";

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioEditor = () => {
  const [layouts, setLayouts] = useRecoilState<Layouts>(gridLayoutState);
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);
  const itemsRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useRecoilState(themeState);

  const user = useRecoilValue(currentUserState);

  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  const changeExtensionSize = useChangeExtensionSize();

  const updateHeight = () => {
    const newLayout = updateLayout(layouts[breakpoint], itemsRef);
    if (layouts[breakpoint] !== newLayout) {
      setLayouts((layouts) => {
        return { ...layouts, [breakpoint]: newLayout };
      });
    }
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      updateHeight();
    }
  }, []);

  if (!site || !user) return null;

  console.log("Site: ", site);

  const changeTitleHandler = (id: string, title: string) => {
    // changeExtensionTitle(id, title);
  };

  const changeSizeHandler = (id: string, size: 1 | 2 | 3) => {
    changeExtensionSize(id, size);
  };

  return (
    <div className={clsx(theme === "dark" && "dark", "w-full h-full ")}>
      <div className="@container overflow-scroll h-full bg-white dark:bg-zinc-900">
        <div
          className="w-full mx-auto max-w-6xl lg: h-full p-12"
          ref={itemsRef}
        >
          <div className="p-8">
            <PageHeader
              title={site.tagline ? site.tagline : "Oops! No tagline found"}
              description={site?.bio ? site.bio : "Oops! No bio found"}
              image={
                user.image ? user.image : "https://via.placeholder.com/150"
              }
              lightMode={theme === "light" ? true : false}
              toggleLightMode={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            />
          </div>

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
            {site.extensions ? (
              site.extensions.map((extension, index) => {
                console.log(extension);

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
              })
            ) : (
              <span>add extension</span>
            )}
            {/* <div key="a" id="a">
              <Block
                actions={{ link: { url: "https://www.google.com" } }}
                handleTitleChange={(title: string) =>
                  changeTitleHandler("id", title)
                }
                handleSizeChange={(size) => changeSizeHandler("a", size)}
                title={"Open Source"}
                imagePath={
                  "https://avatars.githubusercontent.com/u/65030610?s=200&v=4"
                }
                size={
                  layouts[breakpoint].find((l) => l.i === "a")?.w as 1 | 2 | 3
                }
              >
                <List>
                  {blogPosts.map((post, index) => (
                    <List.Item
                      type={"text"}
                      title={post.title}
                      additional={post.additional}
                      subtitle={post.subtitle}
                      key={`Block-${index}`}
                      actions={{ open: { url: "https://dev.to" } }}
                    />
                  ))}
                </List>
              </Block>
            </div>
            <div key="b" id="b">
              <Block
                actions={{ link: { url: "https://www.google.com" } }}
                handleTitleChange={(title) =>
                  changeTitleHandler("id-123", title)
                }
                handleSizeChange={(size) => changeSizeHandler("b", size)}
                title={"Repositories"}
                imagePath={
                  "https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                }
                size={
                  layouts[breakpoint].find((l) => l.i === "b")?.w as 1 | 2 | 3
                }
              >
                <List>
                  {openSource.map((project, index) => (
                    <List.Item
                      type={"card"}
                      title={project.title}
                      additional={project.additional}
                      subtitle={project.subtitle}
                      count={{
                        value: 3214,
                        icon: "StarIcon",
                      }}
                      key={`Block-${index}`}
                      actions={{ open: { url: "https://github.com" } }}
                    />
                  ))}
                </List>
              </Block>
            </div>
            <div key="c" id="c">
              <Block
                actions={{ link: { url: "https://www.google.com" } }}
                handleTitleChange={(title) =>
                  changeTitleHandler("id-123", title)
                }
                handleSizeChange={(size) => changeSizeHandler("c", size)}
                title={"Vibes"}
                imagePath={
                  "https://avatars.githubusercontent.com/u/251374?s=200&v=4"
                }
                size={
                  layouts[breakpoint].find((l) => l.i === "c")?.w as 1 | 2 | 3
                }
              >
                <Card
                  title="New York, New York (Live At Budokan Hall)"
                  subtitle="Frank Sinatra"
                  type="small"
                  image="https://placeimg.com/640/480/arch"
                />
                <List>
                  {spotify.map((track, index) => (
                    <List.Item
                      type={"cover"}
                      title={track.title}
                      subtitle={track.subtitle}
                      image={track.image}
                      index={index + 1}
                      key={`Block-${index}`}
                      actions={{ open: { url: "https://spotify.com" } }}
                    />
                  ))}
                </List>
              </Block>
            </div> */}
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
};

export default StudioEditor;

export const blogPosts = [
  {
    type: "text",
    title: "Crafting a design system for a multiplanetary future",
    additional: "September 1, 2022",
    subtitle:
      "Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
    image: "https://placeimg.com/640/480/nature",
  },
  {
    type: "text",
    title: "Introducing Animaginary: High performance web animations",
    additional: "August 17, 2022",
    subtitle:
      "When you’re building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.",
    image: "https://placeimg.com/640/480/tech",
  },
  {
    type: "text",
    title: "Rewriting the cosmOS kernel in Rust",
    additional: "July 2, 2022",
    subtitle:
      "When we released the first version of cosmOS last year, it was written in Go. Go is a wonderful programming language with a lot of benefits, but it’s been a while since I’ve seen an article on the front page of Hacker News about rewriting some important tool in Go and I see articles on there about rewriting things in Rust every single week.",
    image: "https://placeimg.com/640/480/arch",
  },
];

export const openSource = [
  {
    type: "card",
    title: "Spectrum",
    subtitle: "A simple and beautiful community platform.",
    additional: "withspectrum/spectrum",
    count: {
      value: 3214,
      icon: "StarIcon",
    },
  },
  {
    type: "card",
    title: "styled-components",
    subtitle:
      "Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress 💅",
    additional: "styled-components/styled-components",
    count: {
      value: 1720,
      icon: "StarIcon",
    },
  },
  {
    type: "card",
    title: "react-three-fiber",
    subtitle: "A React renderer for ThreeJS",
    additional: "pmndrs/react-three-fiber",
    count: {
      value: 879,
      icon: "StarIcon",
    },
  },
];

export const spotify = [
  {
    type: "cover",
    title: "The Less I Know The Better",
    subtitle: "Tame Impala",
    additional: "2015",
    count: {
      value: 324,
      icon: "PlayCircleIcon",
    },
    image: "https://placeimg.com/640/480/tech",
  },
  {
    type: "cover",
    title: "Sorry",
    subtitle: "Justin Bieber",
    additional: "2015",
    count: {
      value: 324,
      icon: "PlayCircleIcon",
    },
    image: "https://placeimg.com/740/480/arch",
  },
  {
    type: "cover",
    title: "I Need A Dollar",
    subtitle: "Aloe Blacc",
    additional: "2015",
    count: {
      value: 324,
      icon: "PlayCircleIcon",
    },
    image: "https://placeimg.com/640/480/nature",
  },
  {
    type: "cover",
    title: "STAY",
    subtitle: "The Kid LAROI",
    additional: "2021",
    count: {
      value: 324,
      icon: "PlayCircleIcon",
    },
    image: "https://placeimg.com/640/480/people",
  },
  {
    type: "cover",
    title: "good 4 u",
    subtitle: "Olivia Rodrigo",
    additional: "2021",
    count: {
      value: 324,
      icon: "PlayCircleIcon",
    },
    image: "https://placeimg.com/640/480/arch",
  },
];
