import { ShieldExclamationIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import SignLayout from "../../../src/client/components/01_Account/SignLayout";

interface Errors {
  [key: string]: string;
}

const errors: Errors = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification:
    "The sign in link is no longer valid.<br />Please get a new link by sign in again.",
  default: "There is a problem with the server configuration.",
};

const ErrorMessage = ({ error }: ParsedUrlQuery) => {
  console.log(error);

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
        <div className="max-w-lg mx-auto min-h-screen flex items-center justify-center">
          <div>
            <div className="text-center">
              <ShieldExclamationIcon className="mx-auto h-8 w-8 text-gray-400" />
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                We're sorry!
              </h2>
              <ErrorMessage error={error} />
            </div>
          </div>
        </div>
      </SignLayout>
    </>
  );
}
