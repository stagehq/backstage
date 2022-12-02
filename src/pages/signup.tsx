import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import SignLayout from "../client/components/01_Account/SignLayout";
import Signup from "../client/components/01_Account/Signup";
import LoadingPage from "../client/components/02_AppGlobal/Loading/Page";

export default function SignUp() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    router.push("/workspace/workspaceId");
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Sign Up</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <SignLayout>
          <Signup />
        </SignLayout>
      </>
    );
  }
}
