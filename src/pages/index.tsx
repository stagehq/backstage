import Head from "next/head";
import { useEffect } from "react";
import { CallToAction } from "../client/components/landingpage/CallToAction";
import Favicons from "../client/components/landingpage/Favicons";
import { Footer } from "../client/components/landingpage/Footer";
import { Header } from "../client/components/landingpage/Header";
import { Hero } from "../client/components/landingpage/Hero";
import { PrimaryFeatures } from "../client/components/landingpage/PrimaryFeatures";
import { Reviews } from "../client/components/landingpage/Reviews";
import { SecondaryFeatures } from "../client/components/landingpage/SecondaryFeatures";

export default function Home() {
  useEffect((): void => {
    if (typeof document !== "undefined") {
      document.querySelector("body")?.classList.add("bg-gray-50");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Stage – API-based developer portfolio, that converts.</title>
        <meta
          name="description"
          content="Next-gen developer portfolio that helps you showcase your projects, skills, and experience. Personalize it by an evergrowing collection of building blocks and analyse your growth."
        />
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
        <Favicons />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Reviews />
        {/* <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}
