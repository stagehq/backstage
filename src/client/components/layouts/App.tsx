import { FC, Suspense } from "react";
import { useLocation } from "react-router-dom";
import WorkspaceHeaderLoader from "../../_old/components/03_AppWorkspace/Loader/WorkspaceHeaderLoader";
import { Header } from "../Header";
import Modals from "../Modals";
import Layout from "./General";
interface ShellProps {
  children: React.ReactNode;
}

const Shell: FC<ShellProps> = ({ children }: ShellProps) => {
  // get react router location
  const location = useLocation();
  console.log("location", location);

  return (
    <Layout>
      <Modals />
      <div className="flex h-full">
        <div className="bg-white h-full w-full flex flex-col">
          {/* TODO: Move suspense further down the tree into Header component */}
          <Suspense fallback={<WorkspaceHeaderLoader target={"InAppHeader"} />}>
            <Header />
          </Suspense>
          <div className="w-full flex-1">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Shell;
