import Head from "next/head";
import IdeaOverview from "../../../../_old/components/05_Idea/IdeaOverview";

function IdeasPage() {
  return (
    <>
      <Head>
        <title>Ideas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="min-h-[calc(100vh_-_64px)] w-full py-4 sm:px-2 md:bg-background md:px-6 md:py-7">
          <IdeaOverview />
        </div>
      </>
    </>
  );
}

export default IdeasPage;
