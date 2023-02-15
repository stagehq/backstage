import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { Container } from "../../client/components/landingpage/Container";
import Favicons from "../../client/components/landingpage/Favicons";

/*
These two URLs can be used as the callback URLs when setting up an OAuth application with a specific provider:

http://localhost:3000/service/authenticated
https://getstage.app/service/authenticated

When the OAuth provider redirects the user back to the callback URL after authentication, 
the application can use the provided access token to make authorized requests on behalf of the user. 
Make sure to configure the OAuth provider to allow these specific URLs as callback URLs for your application.
*/

export default function ServiceAuthenticated() {
  return (
    <>
      <Head>
        <title>Stage – API-based developer portfolio, that converts.</title>
        <meta
          name="description"
          content="Service successfully authenticated."
        />
        <Favicons />
      </Head>
      <main className="flex h-screen items-center justify-center">
        <section
          id="secondary-features"
          aria-label="Features for building a portfolio"
        >
          <Container className={""}>
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-zinc-400" />
              <h3 className="mt-2 text-sm font-medium text-zinc-900">
                Service successfully authenticated.
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                This window can be closed.
              </p>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
