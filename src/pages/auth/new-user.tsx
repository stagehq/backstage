import Head from "next/head";
import { Suspense } from "react";
import SignLayout from "../../client/_old/components/01_Account/SignLayout";
import LoadingPage from "../../client/_old/components/02_AppGlobal/Loading/Page";
import Onboarding from "../../client/_old/components/06_Onboarding";

export default function NewUser() {
  return (
    <>
      <Head>
        <title>New user</title>
      </Head>
      <SignLayout>
        <div className="max-w-lg mx-auto min-h-screen flex items-center justify-center">
          <Suspense fallback={<LoadingPage />}>
            <Onboarding />
          </Suspense>
        </div>
      </SignLayout>
    </>
  );
}
