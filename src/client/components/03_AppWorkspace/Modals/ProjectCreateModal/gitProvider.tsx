import { faker } from "@faker-js/faker";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateProjectMutation } from "../../../../graphql/createProject.generated";
import Spinner from "../../../02_AppGlobal/Icons/Spinner";

const provider = [
  { name: "GitHub", colorBg: "#000000", colorText: "#FFFFFF" },
  { name: "GitLab", colorBg: "#E24428", colorText: "#FFFFFF" },
  { name: "Bitbucket", colorBg: "#0152CC", colorText: "#FFFFFF" },
];

export default function GitProvider() {
  /* Data Handling */
  const { data: session } = useSession();
  const [, createProject] = useCreateProjectMutation();

  /* UI States */
  const [createProjectLoading, setCreateProjectLoading] = useState<
    number | null
  >(null);

  /* Fake data */
  const randomProjectName = faker.vehicle.bicycle();

  /* Router */
  const { push: navigate } = useRouter();

  function handleCreateProject(index: number) {
    setCreateProjectLoading(index);
    if (session?.user?.email) {
      createProject({
        name: randomProjectName,
      }).then((result) => {
        setCreateProjectLoading(null);
        const slug = result.data?.createProject?.slug;
        if (slug) navigate(`/workspace/${slug}`);
      });
    }
  }

  return (
    <div>
      <div className="my-4 text-m font-medium text-blue-black">
        Select a Git Provider
      </div>
      <div className="my-4 text-sm text-blue-gray-500">
        Choose the Git provider where your site’s source code is hosted. When
        you push to Git, we run your build tool of choice on our servers and
        deploy the result.
      </div>
      <nav className="flex space-x-4" aria-label="Tabs">
        {provider.map((providerBtn, index) => (
          <button
            key={providerBtn.name}
            style={{
              backgroundColor: providerBtn.colorBg,
              color: providerBtn.colorText,
            }}
            className={clsx("flex px-4 py-2 font-medium text-sm rounded-md")}
            onClick={() => handleCreateProject(index)}
          >
            {createProjectLoading === index && <Spinner color={"text-white"} />}
            {providerBtn.name}
          </button>
        ))}
      </nav>
      <div className="mt-8 text-sm text-blue-gray-500">
        Don’t have a repository yet? Choose the manual project launcher.
      </div>
    </div>
  );
}
