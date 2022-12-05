import Head from "next/head";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "../../../src/client/components/01_Account/Login";
import SignLayout from "../../../src/client/components/01_Account/SignLayout";

const SignIn = () => {
  const token = cookies().get("next-auth.session-token");
  const csrfToken = cookies().get("next-auth.csrf-token");

  if (token?.value) redirect("/discover"); // already logged-in
  if (!csrfToken?.value) redirect("/auth/login"); // no csrf available

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <SignLayout>
        <Login csrfToken={csrfToken.value} />
      </SignLayout>
    </>
  );
};

export default SignIn;
