import { PageFooter, PageHeader } from "@stagehq/ui";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Content from "../../components/Content";
import ShareBar from "../../components/studio/ShareBar";
import SectionList from "../../components/sidebars/SectionList";
import SectionWrapper from "../../components/sidebars/SectionWrapper";
import { personal } from "../../components/sidebars/testData";
import { siteSlugState, siteState } from "../../store/site";

const Site = () => {
  const { siteId } = useParams();

  const [siteSlug, setSiteSlug] = useRecoilState(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  useEffect(() => {
    if (siteId) {
      setSiteSlug(siteId);
    }
  }, [siteId, setSiteSlug]);

  useEffect(() => {
    if (site) {
      console.log(site);
    }
  }, [site]);

  return (
    <>
      <Content>
        <ShareBar state="published" />
        <Studio>
          <SectionSidebar>
            <SectionWrapper>
              <SectionList />
            </SectionWrapper>
          </SectionSidebar>
          <PageWrapper>
            <Page />
          </PageWrapper>
          <EditSidebar>
            {/* React Portal: do not place something insde here */}
          </EditSidebar>
        </Studio>
      </Content>
    </>
  );
};

export default Site;

interface StudioProps {
  children: React.ReactNode;
}

const Studio: FC<StudioProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full relative items-start">{children}</div>
  );
};

interface SectionSidebar {
  children: React.ReactNode;
}

const SectionSidebar: FC<SectionSidebar> = ({ children }) => {
  return (
    <div className="z-10 hidden md:flex flex-col absolute left-0 w-[270px] h-full bg-white border-r border-zinc-100 gap-2 py-3">
      {children}
    </div>
  );
};

interface EditSidebar {
  children: React.ReactNode;
}

const EditSidebar: FC<EditSidebar> = ({ children }) => {
  // is a portal, don't render anything here
  return (
    <div
      id={
        process.env.NEXT_PUBLIC_EDIT_SIDEBAR_PORTAL_NAME || "editSidebarPortal"
      }
      className="z-10 hidden md:flex flex-col absolute right-0 w-[270px] h-full bg-white border-l border-zinc-100 gap-2 py-3"
    >
      {children}
    </div>
  );
};

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="md:fixed md:left-48 md:right-48 h-full overflow-scroll scale-[80%] md:-top-12">
      {children}
    </div>
  );
};

export const Page = () => {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="relative bg-white max-w-screen-xl mx-auto px-6 md:px-24 ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
        <PageHeader
          {...{
            title: personal.name,
            description: personal.description,
            image: personal.image,
            lightMode: true,
            toggleLightMode: () => {
              "toggle light mode";
            },
          }}
        />
        <div className="flex flex-col lg:flex-row gap-6 md:gap-16 py-12 md:py-16">
          <PageMain></PageMain>
          <PageAside></PageAside>
        </div>
      </div>
      <PageFooter
        {...{
          title: "John Doe",
          location: personal.location,
          privacyPolicy: "https://google.com",
        }}
      />
    </div>
  );
};

export const PageMain = () => {
  return (
    <main
      id={process.env.NEXT_PUBLIC_MAIN_PORTAL_NAME || "pageMainPortal"}
      className="flex flex-col items-start gap-12 md:gap-16 lg:w-2/3"
    ></main>
  );
};

export const PageAside = () => {
  return (
    <aside
      id={process.env.NEXT_PUBLIC_ASIDE_PORTAL_NAME || "pageAsidePortal"}
      className="flex flex-col items-start gap-12 md:gap-16 lg:w-1/3"
    ></aside>
  );
};
