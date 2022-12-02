import { MailIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignLayout from "../../../src/client/components/01_Account/SignLayout";

export default function VerifyRequestPage() {
  const token = cookies().get('next-auth.session-token')
  const csrfToken = cookies().get('next-auth.csrf-token')

  if (token?.value) redirect('/discover') // already logged-in
  if (!csrfToken?.value) redirect('/auth/login') // no csrf available

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
