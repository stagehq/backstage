import { FC } from "react";
import CommandBar from "../_old/components/02_AppGlobal/CommandBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full flex-col bg-white">
        <CommandBar>{children}</CommandBar>
      </div>
    </div>
  );
};

export default Layout;
