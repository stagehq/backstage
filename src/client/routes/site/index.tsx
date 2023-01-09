import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Content from "../../components/Content";
import DndPage from "../../components/dnd/dndPage";
import { useStoreExtensionActions } from "../../components/kbar/hooks/useStoreExtensionActions";
import useThemeActions from "../../components/kbar/hooks/useThemeActions";
import ShareBar from "../../components/studio/ShareBar";
import { siteSlugState, siteState } from "../../store/site";
import { themeState } from "../../store/ui/theme";

const Site = () => {
  const { siteId } = useParams();

  const [siteSlug, setSiteSlug] = useRecoilState(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  useEffect(() => {
    if (siteId) {
      setSiteSlug(siteId);
    }
  }, [siteId, setSiteSlug]);

  return (
    <>
      <Content>
        <ShareBar state="published" />
        <Studio>
          <DndPage />
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
    <div className="hidden md:flex flex-col absolute left-0 w-[270px] h-full bg-white border-r border-zinc-100 gap-2 py-3">
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
      className="hidden md:flex flex-col absolute right-0 w-[270px] h-full bg-white border-l border-zinc-100 gap-2 py-3"
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
  const [theme, setTheme] = useRecoilState(themeState);

  useThemeActions();
  useStoreExtensionActions();

  return <div>Test</div>;
};
