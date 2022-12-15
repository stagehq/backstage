import { useSession } from "next-auth/react";
import Head from "next/head";
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

  if (status === "unauthenticated") {
    router.push("/logout");
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
        <div className="max-w-lg mx-auto min-h-screen flex items-center justify-center px-6">
          <div>
            <div className="text-center">
              <div className="flex justify-center">
                <Icon name="EnvelopeIcon" size="lg" color="neutral" />
              </div>
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                You got mail!
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Check your mail to sign in with the magic link we sent you.{" "}
                <br />
                Please try again if no mail is sent at all.
              </p>
            </div>
          </div>
        </div>
      </SignLayout>
    </>
  );
}
