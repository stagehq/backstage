import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { activeSectionState, OnboardingSection } from "../store/ui/onboarding";
import ImageUpload from "./crop/ImageUpload";
import { GradientArea } from "./Login";
import LoginCard from "./LoginCard";

const renderOnboardingSection = (activeSection: OnboardingSection) => {
  switch (activeSection) {
    case "start":
      return <OnboardingStart />;
    case "profile":
      return <OnboardingProfile />;
    case "api":
      return <OnboardingApi />;
    case "cv":
      return <OnboardingCv />;
    case "projects":
      return <OnboardingProjects />;
    case "blogs":
      return <OnboardingBlogs />;
    case "store":
      return <OnboardingStore />;
    case "subdomain":
      return <OnboardingSubdomain />;
    case "done":
      return <OnboardingDone />;
    default:
      return <OnboardingStart />;
  }
};
const Onboarding: FC = () => {
  const [activeSection, setActiveSection] = useRecoilState(activeSectionState);
  return (
    <LoginCard>
      <div className="flex flex-col h-full sm:min-h-[530px]">
        {renderOnboardingSection(activeSection)}
      </div>
    </LoginCard>
  );
};

export default Onboarding;

const OnboardingStart = () => {
  const [, setActiveSection] = useRecoilState(activeSectionState);
  return (
    <>
      <GradientArea />
      <div className="mt-auto py-8 px-4 sm:px-10">
        <div className="flex flex-col justify-start items-start gap-2">
          <p className="text-xl font-semibold text-left text-zinc-900">
            Welcome on Stage
          </p>
          <p className="text-xs font-medium text-left text-zinc-500">
            Let’s get started, by connecting some API’s to your developer
            portfolio.
          </p>
          <button
            type="button"
            onClick={() => setActiveSection("profile")}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
};

const OnboardingProfile = () => {
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");

  const [, setActiveSection] = useRecoilState(activeSectionState);
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col py-6 px-4 sm:px-6 h-full sm:min-h-[530px]">
      <div className="flex flex-col justify-start items-start gap-2">
        <p className="text-xl font-semibold text-left text-zinc-900">
          Basic Information
        </p>
        <p className="text-xs font-medium text-left text-zinc-500">
          <span className="text-xs font-medium text-left text-zinc-500">
            To generate the portfolio we need some basic{" "}
          </span>
          <br />
          <span className="text-xs font-medium text-left text-zinc-500">
            information from you.
          </span>
        </p>
      </div>
      <div className="mt-4 flex flex-col justify-start items-start gap-4">
        <ImageUpload />
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="w-full">
            <label
              htmlFor="tagline"
              className="block text-sm font-medium text-zinc-600"
            >
              Tagline
            </label>
            <div className="mt-1 relative">
              <input
                onChange={(e) => {
                  setTagline(e.target.value);
                }}
                value={tagline}
                id="tagline"
                name="tagline"
                type="text"
                autoComplete="tagline"
                maxLength={65}
                className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between items-start pt-2">
              <p className="text-xs text-left text-zinc-500">
                Write a short tagline.
              </p>
              <p className="text-xs text-left text-zinc-500">
                {tagline.length}/65
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-zinc-600"
          >
            Bio
          </label>
          <div className="mt-1 relative">
            <textarea
              onChange={(e) => {
                setBio(e.target.value);
              }}
              rows={4}
              value={bio}
              id="bio"
              name="bio"
              autoComplete="bio"
              maxLength={250}
              className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-between items-start pt-2">
            <p className="text-xs text-left text-zinc-500">
              Write a few sentences about yourself.
            </p>
            <p className="text-xs text-left text-zinc-500">
              {tagline.length}/250
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <button
          type="button"
          disabled={tagline === "" || bio === ""}
          onClick={() => setActiveSection("api")}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const OnboardingApi: FC = () => {
  return (
    <div>
      <h1>Onboarding API</h1>
    </div>
  );
};

const OnboardingCv: FC = () => {
  return (
    <div>
      <h1>Onboarding CV</h1>
    </div>
  );
};

const OnboardingProjects: FC = () => {
  return (
    <div>
      <h1>Onboarding Projects</h1>
    </div>
  );
};

const OnboardingBlogs: FC = () => {
  return (
    <div>
      <h1>Onboarding Blogs</h1>
    </div>
  );
};

const OnboardingStore: FC = () => {
  return (
    <div>
      <h1>Onboarding Store</h1>
    </div>
  );
};

const OnboardingSubdomain: FC = () => {
  return (
    <div>
      <h1>Onboarding Subdomain</h1>
    </div>
  );
};

const OnboardingDone: FC = () => {
  return (
    <div>
      <h1>Onboarding Done</h1>
    </div>
  );
};
