import Head from "next/head";
import IdeaOverview from "../../../components/05_Idea/IdeaOverview";

function IdeasPage() {
  return (
    <>
      <Head>
        <title>Ideas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="w-full min-h-[calc(100vh_-_64px)] md:bg-background md:px-6 md:py-7 sm:px-2 py-4">
          <IdeaOverview />
        </div>
      </>
    </>
  );
}

export default IdeasPage;
