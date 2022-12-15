import "../../styles/globals.css";

import splitbee from "@splitbee/web";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { Provider } from "urql";
import ToasterComponent from "../client/components/Notification";
import { client } from "../client/graphql/client";

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect((): void => {
    if (process.env.NODE_ENV === "production") {
      splitbee.init({
        token: process.env.SPLITBEE_TOKEN,
        disableCookie: true,
        apiUrl: "/sb-api",
        scriptUrl: "/sb.js",
      });
    }
  }, []);

  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Provider value={client}>
          <div suppressHydrationWarning={true}>
            {typeof window !== "undefined" && (
              <>
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                </Head>
                <Component {...pageProps} />
                <ToasterComponent />
              </>
            )}
          </div>
        </Provider>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default CustomApp;
