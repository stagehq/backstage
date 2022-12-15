import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import SignLayout from "../client/components/layouts/Login";
import LoadingPage from "../client/components/loading/Page";
import Signup from "../client/_old/components/01_Account/Signup";

export default function SignUp() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    router.push("/s/workspace/workspaceId");
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
