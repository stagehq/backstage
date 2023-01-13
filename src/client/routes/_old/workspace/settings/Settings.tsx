import { decode as base64_decode } from "base-64";
import Head from "next/head";
import ProjectSettings from "../../../../_old/components/03_AppWorkspace/ProjectSettings";

export const getIdfromRelayId = (id: string) => base64_decode(id).split(":")[1];

function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="h-[calc(100vh_-_64px)] w-full px-4 py-16 md:px-32">
          <ProjectSettings />
        </div>
      </>
    </>
  );
}

export default SettingsPage;
