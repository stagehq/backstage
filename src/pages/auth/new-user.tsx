import Head from "next/head";
import { Suspense } from "react";
import Layout from "../../client/components/layouts/Login";
import Onboarding from "../../client/components/onboarding/Onboarding";
import LoadingPage from "../../client/_old/components/02_AppGlobal/Loading/Page";

export default function NewUser() {
  return (
    <>
      <Head>
        <title>New user</title>
      </Head>
      <Layout>
        <Suspense fallback={<LoadingPage />}>
          <Onboarding />
        </Suspense>
      </Layout>
    </>
  );
}
