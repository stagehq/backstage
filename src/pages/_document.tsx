import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      // bg-gray-50
      <Html className="h-full antialiased" lang="en">
        <Head>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nanum+Pen+Script&display=swap"
            rel="stylesheet"
          /> */}
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
          <meta property="og:url" content="https://getstage.app/" />
          <meta property="og:title" content="Stage" />
          <meta
            property="og:description"
            content="API-based developer portfolio, that converts."
          />
          {/* Big */}
          {/* <meta
            property="og:image"
            content="https://getstage.app/images/social/social-big.png"
          />
          <meta
            property="og:image:secure"
            content="https://getstage.app/images/social/social-big.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Stage" /> */}
          {/* Small */}
          {/* <meta
            property="og:image"
            content="https://getstage.app/images/social/social-small.png"
          />
          <meta
            property="og:image:secure"
            content="https://getstage.app/images/social/social-small.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="314" />
          <meta property="og:image:alt" content="Stage" /> */}
          {/* Logo */}
          {/* <meta
            property="og:image"
            content="https://getstage.app/images/social/social-logo.jpg"
          />
          <meta
            property="og:image:secure"
            content="https://getstage.app/images/social/social-logo.jpg"
          />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image:alt" content="Stage" /> */}
          {/* Twitter */}
          <meta name="twitter:site" content="@stage_hq" />
        </Head>
        <body className="selection:bg-zinc-800 selection:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
