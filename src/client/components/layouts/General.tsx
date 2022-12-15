import CommandBar from "../kbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CommandBar>{children}</CommandBar>;
};

export default Layout;
