import { FC } from "react";
import Content from "../../components/Content";
import SectionList from "../../components/sidebars/SectionList";
import SectionWrapper from "../../components/sidebars/SectionWrapper";

const Site = () => {
  return (
    <>
      <Content>
        <Studio>
          <SectionSidebar>
            <SectionWrapper>
              <SectionList />
            </SectionWrapper>
          </SectionSidebar>
          <EditSidebar></EditSidebar>
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
  return <div className="flex w-full h-full relative">{children}</div>;
};

interface SectionSidebar {
  children: React.ReactNode;
}

const SectionSidebar: FC<SectionSidebar> = ({ children }) => {
  return (
    <div className="absolute left-0 flex flex-col w-[270px] h-full bg-white border-r border-zinc-100 gap-2 py-3">
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
      className="absolute right-0 flex flex-col w-[270px] h-full bg-white border-l border-zinc-100 gap-2 py-3"
    >
      {children}
    </div>
  );
};
