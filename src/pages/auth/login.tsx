import { getCsrfToken, useSession } from "next-auth/react";

import { InferGetServerSidePropsType } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import Head from "next/head";
import { useRouter } from "next/router";
import Login from "../../client/components/01_Account/Login";
import SignLayout from "../../client/components/01_Account/SignLayout";
import LoadingPage from "../../client/components/02_AppGlobal/Loading/Page";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";

const SignIn = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { status } = useSession();
  const router = useRouter();
  const [{ data, error }] = useGetCurrentUserQuery();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    if (data !== undefined) {
      if (data?.currentUser?.lastProject?.slug !== undefined) {
        router.push("/s/workspace/" + data.currentUser.lastProject?.slug);
      } else {
        router.push("/s/discover");
      }
    }
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>
        <SignLayout>
          <Login csrfToken={csrfToken} />
        </SignLayout>
      </>
    );
  }
};

export default SignIn;

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};
