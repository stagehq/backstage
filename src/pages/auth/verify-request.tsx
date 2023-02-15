import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "../../client/components/Icons";
import SignLayout from "../../client/components/layouts/Login";
import LoadingPage from "../../client/components/loading/Page";

export default function VerifyRequestPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    router.push("/s");
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>E-mail Verification</title>
      </Head>
      <SignLayout>
        <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-6">
          <div>
            <div className="text-center">
              <div className="flex justify-center">
                <Icon name="EnvelopeIcon" size="lg" color="success" />
              </div>
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                You got mail!
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Check your mail to sign in with the magic link we sent you.{" "}
                <br />
                Please try again if no mail is sent at all.
              </p>
              <Link href={"/auth/login"}>
                <a className="mt-4 inline-flex rounded-md border border-transparent bg-gray-600 py-2 px-4 text-center text-sm font-medium text-white shadow-sm hover:bg-gray-700">
                  Go back to Login
                </a>
              </Link>
            </div>
          </div>
        </div>
      </SignLayout>
    </>
  );
}
