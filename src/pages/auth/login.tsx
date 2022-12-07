import { getCsrfToken, useSession } from "next-auth/react";

import { InferGetServerSidePropsType } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../client/components/layouts/Login";
import Login from "../../client/components/Login";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import LoadingPage from "../../client/_old/components/02_AppGlobal/Loading/Page";

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
        <Layout>
          <Login csrfToken={csrfToken ? csrfToken : ""} />
        </Layout>
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
