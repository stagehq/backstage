import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getBaseUrl } from "../../../helper/getBaseUrl";
import { BlockProps } from "../../blocks/type";
import { siteSlugState, siteState } from "../../store/site";
import { gridBreakpointState } from "../../store/ui/grid-dnd";
import { currentUserState } from "../../store/user";
import Footer from "../Footer";
import { PageHeader } from "../PageHeader";
import EmptyState from "./EmptyState";
import { useDropImage } from "./hooks/useDropImage";
import { useHandleLayoutChange } from "./hooks/useHandleLayoutChange";
import MobileEditor from "./MobileEditor";

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioEditor = () => {
  //refs
  const itemsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  //recoil
  const [breakpoint, setBreakpoint] = useRecoilState(gridBreakpointState);
  const user = useRecoilValue(currentUserState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site] = useRecoilState(siteState(siteSlug));
  const [components, setComponents] = useState<{
    [key: string]: FC<BlockProps>;
  }>({});
  const [initialCalculated, setInitialCalculated] = useState(false);
  const [draggedBefore, setDraggedBefore] = useState(false);

  // dropzone
  const { acceptedFiles, getRootProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    maxFiles: 1,
  });

  fileRejections.map(({ file, errors }) => {
    toast.error("Wrong format!");
  });

  const onDrag = () => {
    if (!draggedBefore) {
      setDraggedBefore(true);
    }
  };

  //hook
  const handleLayoutChange = useHandleLayoutChange();
  const dropImage = useDropImage();

  // use effect when accepted files change to upload files to server and update site state with new image in images array
  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      dropImage(acceptedFiles);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (site?.layouts == null) {
      setInitialCalculated(true);
      setTimeout(() => {
        if (itemsRef.current) itemsRef.current.classList.add("animated");
      }, 300);
    }
    //set extensions
    if (site?.extensions) {
      // console.log("test");
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
      // console.log("onSiteChange");
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

  // useEffect(() => {
  //   // console.log(site?.layouts);
  // }, [site]);

  if (!site || !user || !initialCalculated) return null;
  if (!user.sites?.find((s) => s.subdomain === siteSlug))
    navigate(`/${siteSlug}`);

  return (
    <>
      <Head>
        <title>{site.tagline}</title>
        <meta name="description" content={site.bio ? site.bio : ""} />
        <meta name="og:type" content="website" />
        <meta name="robots" content="noindex,nofollow" />
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
      <div className="h-full w-full sm:hidden">
        <MobileEditor />
      </div>
      <div className="hidden h-full w-full sm:block">
        <div
          {...getRootProps({
            className: "h-full w-full",
            onClick: (event) => event.stopPropagation(),
          })}
        >
          <div className="h-full overflow-x-hidden overflow-y-scroll bg-white @container dark:bg-zinc-900">
            <div className="min-h-full w-full max-w-[1200px] pb-24 sm:p-4 lg:mx-auto">
              <div className="py-8">
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
                    containerPadding={[0, 32]}
                    onWidthChange={() => {
                      // console.log("Width changed");
                      handleLayoutChange(itemsRef);
                    }}
                    onBreakpointChange={(breakpoint) => {
                      // console.log("Breakpoint changed");
                      setBreakpoint(breakpoint);
                    }}
                    onLayoutChange={(layout: Layout[], layouts: Layouts) => {
                      // console.log(layouts);
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
            <Footer socials={site.socials} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioEditor;
