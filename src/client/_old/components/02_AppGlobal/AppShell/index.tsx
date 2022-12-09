import { FC, Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Header } from "../../../../components/Header";
import Layout from "../../../../components/layouts/General";
import Modals from "../../../../components/Modals";
import WorkspaceHeaderLoader from "../../03_AppWorkspace/Loader/WorkspaceHeaderLoader";
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
