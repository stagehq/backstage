import { FC, Suspense } from "react";
import { Header } from "../../../components/Header";
import Layout from "../../../components/layouts/General";
import Modals from "../../../components/Modals";

interface ShellProps {
  children: React.ReactNode;
}

const Shell: FC<ShellProps> = ({ children }: ShellProps) => {
  return (
    <Layout>
      <Modals />
      <div className="flex h-full">
        <div className="bg-white h-full w-full flex flex-col">
          {/* TODO: Move suspense further down the tree into Header component */}
          <Suspense fallback={<div />}>
            <Header />
          </Suspense>
          <div className="w-full flex-1">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Shell;