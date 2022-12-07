import { MailIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import SignLayout from "../../client/components/layouts/Login";
import { currentUserState } from "../../client/store/user";
import LoadingPage from "../../client/_old/components/02_AppGlobal/Loading/Page";

export default function VerifyRequestPage() {
  const { status } = useSession();
  const router = useRouter();
  const [currentUser] = useRecoilState(currentUserState);

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    router.push("/logout");
  }

  if (status === "authenticated") {
    if (currentUser) {
      if (currentUser?.lastProject?.slug !== undefined) {
        router.push("/s/workspace/" + currentUser.lastProject?.slug);
      } else {
        router.push("/s/discover");
      }
    }
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>E-mail Verification</title>
      </Head>
      <SignLayout>
        <div className="max-w-lg mx-auto min-h-screen flex items-center justify-center">
          <div>
            <div className="text-center">
              <MailIcon className="mx-auto h-8 w-8 text-gray-400" />
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
