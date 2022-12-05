import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import InAppHeader from "../../03_AppWorkspace/InAppHeader";
import SidebarLoader from "../../03_AppWorkspace/Loader/SidebarLoader";
import WorkspaceHeaderLoader from "../../03_AppWorkspace/Loader/WorkspaceHeaderLoader";
import ProjectCreateModal from "../../03_AppWorkspace/Modals";
import { Sidebar } from "../../03_AppWorkspace/Sidebar";
import WorkspaceHeader from "../../03_AppWorkspace/WorkspaceHeader";
import CommandBar from "../CommandBar";
import SettingsModal from "../SettingsModal";

interface Props {
  children: React.ReactNode;
}
interface ShellProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <div className="flex h-full flex-col bg-white">
      <CommandBar>{children}</CommandBar>
    </div>
  );
}

export default function AppShell({ children }: ShellProps) {
  const { status } = useSession();

  // get route from react router
  const location = useLocation();
  const pageName = location.pathname.split("/")[2];

  return (
    <div className="h-screen overflow-hidden">
      <AppLayout>
        {status === "authenticated" ? (
          <div>
            <SettingsModal />
            <ProjectCreateModal />
          </div>
        ) : null}
        <div className="flex h-full">
          <Suspense fallback={<SidebarLoader />}>
            {pageName === "workspace" && <Sidebar />}
          </Suspense>
          <div className="bg-white h-full w-full flex flex-col">
            {pageName === "workspace" ? (
              <Suspense
                fallback={<WorkspaceHeaderLoader target={"WorkspaceHeader"} />}
              >
                <WorkspaceHeader />
              </Suspense>
            ) : (
              <Suspense
                fallback={<WorkspaceHeaderLoader target={"InAppHeader"} />}
              >
                <InAppHeader />
              </Suspense>
            )}
            <div className="w-full flex-1">{children}</div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
