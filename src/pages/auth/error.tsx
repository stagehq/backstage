import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Icon } from "../../client/components/Icons";
import SignLayout from "../../client/components/layouts/Login";

interface Errors {
  [key: string]: string;
}

const errors: Errors = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied:
    "Hey! We're currently in closed alpha, so your account hasn't been granted access yet. We're adding new spots regularly though, and we'll send you a mail as soon as you can try it out. <br/><br/>Registered with another mail? Please make sure to sign in with the mail you registered with or use Magic Link Sign-In.",
  Verification:
    "The sign in link is no longer valid.<br />Please get a new link by sign in again.",
  default: "There is a problem with the server configuration.",
};

const ErrorMessage = ({ error }: ParsedUrlQuery) => {
  // console.log(error);

  const errorMessage =
    error && typeof error === "string" && (errors[error] ?? errors.default);
  return (
    <p
      className="mt-1 text-sm text-gray-500"
      dangerouslySetInnerHTML={{
        __html: errorMessage ? errorMessage : errors.default,
      }}
    ></p>
  );
};

export default function ErrorPage() {
  const { error } = useRouter().query;

  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <SignLayout>
        <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-6">
          <div>
            <div className="text-center">
              <div className="flex justify-center">
                <Icon name="CursorArrowRaysIcon" size="lg" color="warning" />
              </div>
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                Your're almost there! 🥳
              </h2>
              <ErrorMessage error={error} />
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
