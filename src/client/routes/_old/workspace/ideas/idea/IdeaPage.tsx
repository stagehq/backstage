import Head from "next/head";
import { FC, Suspense } from "react";
import LoadingPage from "../../../../../components/loading/Page";
import IdeaContainer from "../../../../../_old/components/05_Idea/IdeaDetail";

const IdeaPage: FC = () => {
  return (
    <>
      <Head>
        <title>Idea</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="h-[calc(100vh_-_64px)] w-full overflow-y-scroll bg-background">
          <Suspense fallback={<LoadingPage />}>
            <IdeaContainer />
          </Suspense>
        </div>
      </>
    </>
  );
};

export default IdeaPage;
