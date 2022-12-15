import Head from "next/head";
import { Suspense } from "react";
import Layout from "../../client/components/layouts/Login";
import LoadingPage from "../../client/components/loading/Page";
import Onboarding from "../../client/components/onboarding/Onboarding";

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
