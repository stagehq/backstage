import Head from "next/head";
import { FC, Suspense } from "react";
import LoadingPage from "../../../../components/02_AppGlobal/Loading/Page";
import IdeaContainer from "../../../../components/05_Idea/IdeaDetail";

const IdeaPage: FC = () => {
  return (
    <>
      <Head>
        <title>Idea</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="w-full h-[calc(100vh_-_64px)] bg-background overflow-y-scroll">
          <Suspense fallback={<LoadingPage />}>
            <IdeaContainer />
          </Suspense>
        </div>
      </>
    </>
  );
};

export default IdeaPage;
