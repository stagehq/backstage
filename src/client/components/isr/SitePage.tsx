import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, useEffect, useRef, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { getBaseUrl } from "../../../helper/getBaseUrl";
import { BlockProps } from "../../blocks/type";
import { Site } from "../../graphql/types.generated";
import { handleDynamicHeight } from "../../helper/racingBuffer";
import Footer from "../Footer";
import { SocialsType } from "../modals/sitesettings/Socials";
import { renderSocialsColorBorder } from "../PageHeader";
import EmptyState from "../studio/EmptyState";
import { useHandleLayoutChange } from "../studio/hooks/useHandleLayoutChange";

const ResponsiveGridLayout = WidthProvider(Responsive);

const SitePage: React.FC<{ data: Site }> = (data) => {
  //recoil
  const [breakpoint, setBreakpoint] = useState("lg");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const site = data.data;
  const [components, setComponents] = useState<{
    [key: string]: FC<BlockProps>;
  }>({});

  //hook
  const handleLayoutChange = useHandleLayoutChange();

  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //set extensions
    if (site?.extensions) {
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
  }, [site?.extensions]);

  window.dispatchEvent(new Event("resize"));

  if (!site) return null;

  return (
    <>
      <Head>
        <title>{site.tagline}</title>
        <meta name="description" content={site.bio ? site.bio : ""} />
        <meta name="og:type" content="website" />
        <meta name="robots" content="index,follow" />
        <meta
          property="og:image"
          content={`${getBaseUrl()}/api/og?tagline=${encodeURIComponent(
            site.tagline ? site.tagline : ""
          )}&bio=${encodeURIComponent(
            site.bio ? site.bio : ""
          )}&image=${encodeURIComponent(
            "https://" + site.image ? "https://" + site.image : ""
          )}`}
        />
        <meta property="og:title" content={site.tagline ? site.tagline : ""} />
        <meta property="og:description" content={site.bio ? site.bio : ""} />
        <meta property="og:url" content={getBaseUrl() + "/" + site.subdomain} />
      </Head>
      <div className={clsx(theme === "dark" && "dark", "h-screen w-full ")}>
        <div className="h-full overflow-x-hidden overflow-y-scroll bg-white @container dark:bg-zinc-900">
          <div className="min-h-full w-full max-w-6xl p-0 pb-24 sm:p-4 lg:mx-auto lg:p-12">
            <div className="p-8">
              <IsrPageHeader
                disabled
                site={site}
                theme={theme}
                setTheme={setTheme}
              />
            </div>
            {site.extensions && site.extensions.length > 0 ? (
              <div ref={itemsRef}>
                <ResponsiveGridLayout
                  layouts={site.layouts ? site.layouts : {}}
                  breakpoints={{ lg: 991, md: 768, sm: 0 }}
                  cols={{ lg: 3, md: 2, sm: 1 }}
                  rowHeight={1}
                  width={1000}
                  margin={[32, 32]}
                  isResizable={false}
                  isDraggable={false}
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
                          <div key={extension.id} id={extension.id}>
                            <Extension
                              gridRef={itemsRef}
                              extension={extension}
                              size={size}
                              isEditable={false}
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
          <Footer socials={site.socials} />
        </div>
      </div>
    </>
  );
};

interface PageHeaderProps {
  disabled?: boolean;
  site: Site;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const IsrPageHeader: FC<PageHeaderProps> = (props) => {
  //refs
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const taglineRef = useRef<HTMLTextAreaElement>(null);

  //local state
  const bio = props.site?.bio;
  const tagline = props.site?.tagline;

  //state
  const site = props.site;

  //handle sizing
  useEffect(() => {
    handleDynamicHeight(bioRef);
  }, [bioRef, bio]);

  useEffect(() => {
    handleDynamicHeight(taglineRef);
  }, [taglineRef, tagline]);

  //handle window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    handleDynamicHeight(bioRef);
    handleDynamicHeight(taglineRef);
  };

  // const renderSocials = (social: string) => {
  //   switch (social) {
  //     case "twitter":
  //       return <Twitter className="h-5 w-5" />;
  //     case "instagram":
  //       return <Instagram className="h-5 w-5" />;
  //     case "facebook":
  //       return <Facebook className="h-5 w-5" />;
  //     case "linkedin":
  //       return <Linkedin className="h-5 w-5" />;
  //     case "github":
  //       return <Github className="h-5 w-5" />;
  //     case "gitlab":
  //       return <Gitlab className="h-5 w-5" />;
  //     case "youtube":
  //       return <Youtube className="h-5 w-5" />;
  //     case "twitch":
  //       return <Twitch className="h-5 w-5" />;
  //     case "pinterest":
  //       return <Pinterest className="h-5 w-5" />;
  //     case "tiktok":
  //       return <Tiktok className="h-5 w-5" />;
  //     case "reddit":
  //       return <Reddit className="h-5 w-5" />;
  //     case "spotify":
  //       return <Spotify className="h-5 w-5" />;
  //     case "soundcloud":
  //       return <Soundcloud className="h-5 w-5" />;
  //     case "dribbble":
  //       return <Dribbble className="h-5 w-5" />;
  //     case "behance":
  //       return <Behance className="h-5 w-5" />;
  //     default:
  //       return <LinkIcon className="h-5 w-5" />;
  //   }
  // };

  if (!site) return null;

  return (
    <div className="flex flex-col items-start justify-start gap-[54px] pt-6 @container">
      <div className="flex items-start justify-end gap-2 self-stretch">
        <button
          className="relative flex cursor-pointer items-start justify-start gap-2 rounded-full bg-zinc-100/40 p-2 ring-1 ring-zinc-900/5 backdrop-blur focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-800/90 dark:ring-white/30 dark:focus:ring-zinc-300"
          onClick={() =>
            props.setTheme(props.theme === "light" ? "dark" : "light")
          }
        >
          {props.theme === "light" ? (
            <SunIcon className="h-5 w-5 text-zinc-600" />
          ) : (
            <MoonIcon className="h-5 w-5 text-zinc-300" />
          )}
        </button>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-8 self-stretch @3xl:w-3/4 @6xl:w-1/2">
        <IsrImageUpload
          imageUrl={site.image ? site.image : ""}
          size="w-20 h-20"
        />
        <div className="flex w-full flex-col gap-4">
          <textarea
            ref={taglineRef}
            value={tagline ? tagline : ""}
            id="tagline"
            placeholder="Enter tagline..."
            className={clsx(
              "-ml-4 block w-full resize-none border-0 border-l-2 border-transparent bg-white py-0 px-0 pl-4 text-2xl font-bold text-zinc-800 placeholder-zinc-300 dark:bg-zinc-900 dark:text-zinc-200 lg:text-4xl",
              !props.disabled &&
                "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-transparent active:border-zinc-600 hover:dark:border-zinc-600   focus:dark:border-zinc-300 active:dark:border-zinc-300"
            )}
            disabled={props.disabled}
          />
          <textarea
            ref={bioRef}
            value={bio ? bio : ""}
            id="bio"
            placeholder="Enter bio..."
            className={clsx(
              "-ml-4 block w-full resize-none border-0 border-l-2 border-transparent bg-white py-0 px-0 pl-4 text-sm text-zinc-800 placeholder-zinc-400   dark:bg-zinc-900 dark:text-zinc-200 focus:dark:border-zinc-300 ",
              !props.disabled &&
                "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-transparent active:border-zinc-600 hover:dark:border-zinc-600 active:dark:border-zinc-300"
            )}
            disabled={props.disabled}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="flex items-center justify-start gap-4">
            {site.socials?.map(
              (social: { url: string; network: SocialsType }) => {
                return (
                  <a
                    key={social.network}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                      "block w-full resize-none border-transparent bg-white text-sm text-zinc-600 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-900 dark:text-zinc-200",
                      !props.disabled &&
                        "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-2 focus:ring-zinc-600 active:border-zinc-600 hover:dark:border-zinc-600 focus:dark:border-zinc-300 active:dark:border-zinc-300"
                    )}
                  >
                    {renderSocialsColorBorder(social.network)}
                  </a>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface IsrImageUploadProps {
  imageUrl: string;
  size: string;
}

const IsrImageUpload: FC<IsrImageUploadProps> = ({ imageUrl, size }) => {
  return (
    <>
      <div
        className={clsx(
          "relative flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-zinc-600 focus-within:ring-offset-2 dark:focus-within:ring-zinc-300 dark:focus-within:ring-offset-zinc-900",
          size
        )}
      >
        {imageUrl ? (
          <div className="inline-block h-full w-full overflow-hidden rounded-full">
            <img
              className="h-full w-full"
              src={imageUrl}
              referrerPolicy="no-referrer"
              alt="image"
            />
          </div>
        ) : (
          <div className="h-full w-full rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800" />
        )}
      </div>
    </>
  );
};

export default SitePage;
