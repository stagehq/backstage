import CommandBar from "../kbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full flex-col bg-white">
        <CommandBar>{children}</CommandBar>
      </div>
    </div>
  );
};

export default Layout;
