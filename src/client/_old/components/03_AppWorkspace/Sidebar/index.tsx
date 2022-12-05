import { FC } from "react";

import { SidebarNavigation } from "../SidebarNavigation";
import WorkspaceSelector from "../WorkspaceSelector";

const Sidebar: FC = () => {
  return (
    <div className="lg:flex flex-col min-h-0 border-r border-gray-200 bg-white w-60 hidden">
      <div className="flex-1 flex flex-col pt-3 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <WorkspaceSelector />
        </div>
        <SidebarNavigation />
      </div>
    </div>
  );
};

export { Sidebar };
