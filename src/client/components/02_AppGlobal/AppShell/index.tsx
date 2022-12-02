import { authOptions } from "@/lib/auth";
import { unstable_getServerSession } from "next-auth";
import { Suspense } from "react";
import { usePathname } from 'next/navigation';
import InAppHeader from "../../03_AppWorkspace/InAppHeader";
import SidebarLoader from "../../03_AppWorkspace/Loader/SidebarLoader";
import WorkspaceHeaderLoader from "../../03_AppWorkspace/Loader/WorkspaceHeaderLoader";
import ProjectCreateModal from "../../03_AppWorkspace/Modals";
import { Sidebar } from "../../03_AppWorkspace/Sidebar";
import WorkspaceHeader from "../../03_AppWorkspace/WorkspaceHeader";
import CommandBar from "../CommandBar";
import SettingsModal from "../SettingsModal";

interface AppLayoutProps {
  children: React.ReactNode;
}
interface AppShellProps {
  children: React.ReactNode | Promise<Element>;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <CommandBar>{children}</CommandBar>
    </div>
  );
}

export default function AppShell({ children }: AppShellProps) {
  const pageName = usePathname();  

  return (
    <div className="h-screen overflow-hidden">
      <AppLayout>
        {/* {status === "authenticated" ? (
          <div>
            <SettingsModal />
            <ProjectCreateModal />
          </div>
        ) : null} */}
        <div className="flex h-full">
          <Suspense fallback={<SidebarLoader />}>
            {pageName === "/workspace" && <Sidebar />}
          </Suspense>
          <div className="bg-white h-full w-full flex flex-col">
            {pageName === "/workspace" ? (
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
            {/* @ts-expect-error Server Component */}
            <div className="w-full flex-1">{children}</div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
