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
