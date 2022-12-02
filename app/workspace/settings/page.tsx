import Head from "next/head";
import ProjectSettings from "../../../src/client/components/03_AppWorkspace/ProjectSettings";

function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="w-full h-[calc(100vh_-_64px)] px-4 md:px-32 py-16">
          <ProjectSettings />
        </div>
      </>
    </>
  );
}

export default SettingsPage;
