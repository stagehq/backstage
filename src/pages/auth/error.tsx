import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Icon } from "../../client/components/Icons";
import SignLayout from "../../client/components/layouts/Login";

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
        <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-6">
          <div>
            <div className="text-center">
              <div className="flex justify-center">
                <Icon name="ShieldExclamationIcon" size="lg" color="warning" />
              </div>
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
