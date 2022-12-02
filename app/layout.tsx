"use client";

import "../styles/globals.css";

import splitbee from "@splitbee/web";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { Provider } from "urql";
import ToasterComponent from "../src/client/components/04_Notification";
import { client } from "../src/client/graphql/client";
import AppShell from "@/client/components/02_AppGlobal/AppShell";
0;

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
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
    <html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nanum+Pen+Script&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        {/* Social Cards */}
        <meta property="og:url" content="https://zirkular.dev/" />
        <meta property="og:title" content="Zirkular" />
        <meta
          property="og:description"
          content="Zirkular connects open source contributors & maintainers in a community-first workspace with efficient workflows."
        />
        {/* Big */}
        <meta
          property="og:image"
          content="https://zirkular.dev/images/social/social-big.png"
        />
        <meta
          property="og:image:secure"
          content="https://zirkular.dev/images/social/social-big.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Zirkular" />
        {/* Small */}
        <meta
          property="og:image"
          content="https://zirkular.dev/images/social/social-small.png"
        />
        <meta
          property="og:image:secure"
          content="https://zirkular.dev/images/social/social-small.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="314" />
        <meta property="og:image:alt" content="Zirkular" />
        {/* Logo */}
        <meta
          property="og:image"
          content="https://zirkular.dev/images/social/social-logo.jpg"
        />
        <meta
          property="og:image:secure"
          content="https://zirkular.dev/images/social/social-logo.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="Zirkular" />
        {/* Twitter */}
        <meta name="twitter:site" content="@zirkular_os" />
      </Head>
      <body className="selection:bg-indigo-600 selection:text-white">
        <RecoilRoot>
          <SessionProvider>
            <Provider value={client}>
              <AppShell>
                {children}
              </AppShell>
              <ToasterComponent />
            </Provider>
          </SessionProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}

export default RootLayout;
