import Head from "next/head";
import { FC } from "react";
import IdeaCreate from "../../../../_old/components/05_Idea/IdeaCreate";

const IdeaCreatePage: FC = () => {
  return (
    <>
      <Head>
        <title>Create a new idea</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="h-[calc(100vh_-_64px)] w-full overflow-y-scroll bg-background">
          <IdeaCreate />
        </div>
      </>
    </>
  );
};

export default IdeaCreatePage;
