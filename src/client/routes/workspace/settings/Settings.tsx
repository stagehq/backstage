import { decode as base64_decode } from "base-64";
import Head from "next/head";
import ProjectSettings from "../../../../client/components/03_AppWorkspace/ProjectSettings";

export const getIdfromRelayId = (id: string) => base64_decode(id).split(":")[1];

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
