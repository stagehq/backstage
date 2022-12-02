import { FC, useState } from "react";

// import { Dropzone } from "../Dropzone";
import { useSession } from "next-auth/react";
import { User } from "../../../../graphql/types.generated";
import GitProvider from "./gitProvider";
import ManualFrom from "./manualForm";
import TabMenu from "./tabMenu";
interface ProjectCreateProps {
  user: User;
}

export type ProjectCreateNavProps = "manual" | "import";

const ProjectCreate: FC<ProjectCreateProps> = ({ user }) => {
  const { data: session } = useSession();
  const [projectCreateNav, setProjectCreateNav] =
    useState<ProjectCreateNavProps>("import");

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white py-6 px-4 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-4">
            <h2 className="text-xl font-medium text-gray-900">
              Create a new project
            </h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              To add start your new project with our community boilerplate, we
              need some information from you.
            </p>
          </div>
          <div className="sm:col-span-6">
            <TabMenu
              selected={projectCreateNav}
              setSelected={setProjectCreateNav}
            />
          </div>
          <div className="relative sm:col-span-6">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="sm:col-span-6">
            {projectCreateNav === "import" ? <GitProvider /> : <ManualFrom />}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectCreate };
