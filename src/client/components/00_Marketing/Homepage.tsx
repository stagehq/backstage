import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CookieConsent from "react-cookie-consent";
import { CallToAction } from "./CallToAction";
import Compare from "./Compare";
import FeatureCommunication from "./FeatureCommunication";
import FeatureCommunity from "./FeatureCommunity";
import FeatureConnected from "./FeatureConnected";
import FeatureMeeting from "./FeatureMeeting";
import { Hero } from "./Hero";
import Layout from "./Layout";

export type SubmitStateType = "Unsubmitted" | "Loading" | "Success" | "Error";

function Homepage() {
  const [email, setEmail] = useState<string | null>(null);
  const [submitState, setSubmitState] =
    useState<SubmitStateType>("Unsubmitted");

  const handleRedirect = () => {
    window.location.replace(
      `https://docs.google.com/forms/d/e/1FAIpQLSfRQ_lwG2HptRUA5cZux8qGhRblAuA9KeLGUZmgEcWDAmkszg/viewform`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("Loading");
    if (email) {
      fetch("/api/mailchimp/subscribe", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 400) {
            throw "error";
          } else {
            setSubmitState("Success");
            setTimeout(handleRedirect, 1500);
          }
        })
        .catch(() => {
          setSubmitState("Error");
        });
    }
  };

  return (
    <>
      <Head>
        <title>Zirkular – Open source made easy.</title>
        <meta
          name="description"
          content="Zirkular connects contributors and maintainers in a community-first workspace with goal-oriented communication, efficient workflows and smart automations."
        />
      </Head>
      <CookieConsent
        location="bottom"
        buttonText="OK"
        style={{
          margin: "16px calc((100vw - 343px) / 2)",
          borderRadius: "8px",
          paddingLeft: "8px",
          backgroundColor: "#F7F6F6",
          border: "1px solid #D1D2DC",
          color: "#353655",
          width: "343px",
          minWidth: "343px",
          fontSize: "16px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.05)",
        }}
        buttonStyle={{
          borderRadius: "8px",
          backgroundColor: "#4C4EDC",
          color: "#FFFFFF",
          height: "48px",
          padding: "0 20px",
          margin: "8px",
          flex: "1 0 300px",
        }}
      >
        {"We use cookies. "}
        <Link href="/privacy" legacyBehavior>
          <span className="text-indigo-700 hover:text-indigo-500 underline">
            Learn more
          </span>
        </Link>
      </CookieConsent>
      <Layout>
        <div className="relative overflow-hidden">
          <main>
            <Hero {...{ email, setEmail, handleSubmit, submitState }} />
            <Compare />
            <FeatureCommunity />
            <FeatureMeeting />
            <FeatureCommunication />
            <FeatureConnected />
            {/* Community Voices */}
            <CallToAction {...{ email, setEmail, handleSubmit, submitState }} />
          </main>
        </div>
      </Layout>
    </>
  );
}

export default Homepage;
