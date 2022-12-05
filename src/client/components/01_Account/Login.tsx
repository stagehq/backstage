"use client";

import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

interface Errors {
  [key: string]: string;
}

const errors: Errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "OAuthSignin Error: Try signing with a different account.",
  OAuthCallback: "OAuthCallback Error: Try signing with a different account.",
  OAuthCreateAccount:
    "OAuthCreateAccount Error: Try signing with a different account.",
  EmailCreateAccount:
    "EmailCreateAccount Error: Try signing with a different account.",
  Callback: "Callback Error: Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

const SignInError = ({ error }: ParsedUrlQuery) => {
  const errorMessage =
    error && typeof error === "string" && (errors[error] ?? errors.default);
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-700">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Login = ({ csrfToken }: { csrfToken: string }) => {
  const [email, setEmail] = useState("");
  const error = useSearchParams().get("error");

  return (
    <div>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/images/logo.svg"
            alt="Workflow"
          />
          {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p> */}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              method="post"
              action="/api/auth/signin/email"
            >
              {error && error !== "EmailSignin" && (
                <SignInError error={error} />
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {error === "EmailSignin" ? (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  ) : null}
                </div>
                {error === "EmailSignin" ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter a valid email.
                  </p>
                ) : null}
              </div>

              <input
                name="csrfToken"
                type="hidden"
                className="invisible hidden absolute"
                defaultValue={
                  typeof csrfToken === "string" ? csrfToken : undefined
                }
              />

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <span
                    onClick={() => signIn("github")}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 hover:cursor-default">GitHub</span>
                  </span>
                </div>

                <div>
                  <span
                    onClick={() => signIn("gitlab")}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 26 24"
                    >
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M12.9055 24L0.402526 14.723C0.240022 14.5947 0.11812 14.4221 0.0515256 14.226L0.0495256 14.218C-0.0184897 14.0206 -0.0177849 13.806 0.0515256 13.609L0.0495256 13.616L1.51253 9.179L12.9055 24ZM5.29253 0.354L8.16653 9.177H1.51153L4.33453 0.354C4.3689 0.25123 4.4347 0.16186 4.52263 0.0985179C4.61055 0.0351753 4.71616 0.00106265 4.82453 0.001H4.83953H4.83853L4.86453 0C5.07653 0 5.25253 0.151 5.29153 0.351V0.354H5.29253ZM8.16653 9.177H17.6455L12.9065 24L8.16653 9.177ZM25.7615 13.613C25.8295 13.8104 25.8288 14.025 25.7595 14.222L25.7615 14.215C25.6959 14.4132 25.5739 14.588 25.4105 14.718L25.4085 14.72L12.9055 24L24.2995 9.177L25.7615 13.613ZM21.4765 0.354L24.2995 9.177H17.6445L20.5185 0.354C20.5385 0.24991 20.5957 0.156661 20.6795 0.0916912C20.7632 0.0267219 20.8677 -0.00551835 20.9735 0.001H20.9725H20.9865C21.2135 0.001 21.4055 0.147 21.4755 0.35L21.4765 0.354V0.354Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="ml-2 hover:cursor-default">GitLab</span>
                  </span>
                </div>

                <div>
                  <span
                    onClick={() => signIn("google")}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21.456 10.154c.123.659.19 1.348.19 2.067 0 5.624-3.764 9.623-9.449 9.623A9.841 9.841 0 012.353 12a9.841 9.841 0 019.844-9.844c2.658 0 4.879.978 6.583 2.566l-2.775 2.775V7.49c-1.033-.984-2.344-1.489-3.808-1.489-3.248 0-5.888 2.744-5.888 5.993 0 3.248 2.64 5.998 5.888 5.998 2.947 0 4.953-1.685 5.365-3.999h-5.365v-3.839h9.26z"
                      ></path>
                    </svg>
                    <span className="ml-2 hover:cursor-default">Google</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
