import { getCsrfToken, useSession } from "next-auth/react";

import { InferGetServerSidePropsType } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../client/components/layouts/Login";
import LoadingPage from "../../client/components/loading";
import Login from "../../client/components/Login";

const SignIn = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    router.push("/s");
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
