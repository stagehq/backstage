import { Block, Card, List, PageHeader } from "@stagehq/ui";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateExtensionTitleMutation } from "../../graphql/updateExtensionTitle.generated";
import { siteSlugState, siteState } from "../../store/site";
import { themeState } from "../../store/ui/theme";
import { currentUserState } from "../../store/user";
import { initalData, LayoutType, updateLayout } from "../dnd/utils";

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioEditor = () => {
  const [items, setItems] = useState<LayoutType[]>(initalData);
  const itemsRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useRecoilState(themeState);

  const user = useRecoilValue(currentUserState);

  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  const [, updateExtensionTitle] = useUpdateExtensionTitleMutation();

  // const changeExtensionTitle = async (id: string, title: string) => {
  //   try {
  //     // update extension in database
  //     await updateExtensionTitle({
  //       id,
  //       title,
  //     });

  //     // update extension in recoil site store with id
  //     if (!site) return null;
  //     setSite((site) => {
  //       if (site) {
  //         const newSite = { ...site };
  //         if (!newSite.extensions) return null;
  //         const index = newSite.extensions.findIndex(
  //           (extension) => extension.id === id
  //         );
  //         if (index !== -1) {
  //           newSite.extensions[index].title = title;
  //         }
  //         return newSite;
  //       } else {
  //         return site;
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (document.readyState === "complete") {
      const newItems = updateLayout(items, itemsRef);
      setItems(newItems);
    }
  }, []);

  if (!site || !user) return null;

  console.log("Site: ", site);

  const changeTitleHandler = (id: string, title: string) => {
    // changeExtensionTitle(id, title);
  };

  const exampleChangeSize = (size: number) => {
    console.log("size: " + size);
  };

  const siteX = [
    {
      id: "123",
      title: "Open Source",
      action: (title: string) => changeTitleHandler("id", title),
    },
  ];

  return (
    <div
      className={clsx(
        "w-full h-full @container overflow-scroll",
        theme === "dark" && "dark"
      )}
    >
      <div
        className="sm:w-full md:w-[750] lg:w-[1200px] h-full bg-white dark:bg-black mx-auto p-12"
        ref={itemsRef}
      >
        <div className="p-8">
          <PageHeader
            title={site.tagline ? site.tagline : "Oops! No tagline found"}
            description={site?.bio ? site.bio : "Oops! No bio found"}
            image={user.image ? user.image : "https://via.placeholder.com/150"}
            lightMode={theme === "light" ? true : false}
            toggleLightMode={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
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
          <div key="a" id="a" className="bg-white dark:bg-black">
            <Block
              actions={{ link: { url: "https://www.google.com" } }}
              handleTitleChange={(title: string) =>
                changeTitleHandler("id", title)
              }
              handleSizeChange={exampleChangeSize}
              title={"Open Source"}
              imagePath={
                "https://avatars.githubusercontent.com/u/65030610?s=200&v=4"
              }
              size={1}
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
          <div key="b" id="b" className="bg-white dark:bg-black">
            <Block
              actions={{ link: { url: "https://www.google.com" } }}
              handleTitleChange={(title) => changeTitleHandler("id-123", title)}
              handleSizeChange={exampleChangeSize}
              title={"Repositories"}
              imagePath={
                "https://avatars.githubusercontent.com/u/9919?s=200&v=4"
              }
              size={2}
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
          <div key="c" id="c" className="bg-white dark:bg-black">
            <Block
              actions={{ link: { url: "https://www.google.com" } }}
              handleTitleChange={(title) => changeTitleHandler("id-123", title)}
              handleSizeChange={exampleChangeSize}
              title={"Vibes"}
              imagePath={
                "https://avatars.githubusercontent.com/u/251374?s=200&v=4"
              }
              size={3}
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
          </div>
        </ResponsiveGridLayout>
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
