import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  activeSectionState,
  OnboardingSection,
} from "../../store/ui/onboarding";
import ImageUpload from "../crop/ImageUpload";
import Gradient from "../Gradient";
import { GradientArea } from "../Login";
import LoginCard from "../LoginCard";
import BlogsIcon from "./visuals/BlogsIcon";
import CheckIcon from "./visuals/CheckIcon";
import CvIcon from "./visuals/CvIcon";
import GGIcons from "./visuals/GGIcons";

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
          onClick={() => setActiveSection("cv")}
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
  const [link, setLink] = useState("");
  const [, setActiveSection] = useRecoilState(activeSectionState);
  const [validLink, setValidLink] = useState(false);

  const isValidLink = (link: string) => {
    const regex = new RegExp(
      "^(https?:\\/\\/)?(www.|[a-z]{2}.)?\\linkedin\\.com\\/.+$"
    );
    return regex.test(link);
  };

  useEffect(() => {
    setValidLink(isValidLink(link));
  }, [link]);

  return (
    <>
      <div className="relative h-64">
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10">
          <CvIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="py-8 px-4 sm:px-10">
        <div className="flex flex-col justify-start items-start gap-4">
          <p className="text-xl font-semibold text-left text-zinc-900">
            Connect your CV
          </p>
          <div className="w-full">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-zinc-600"
            >
              LinkedIn profile url
            </label>
            <div className="mt-1 relative">
              <input
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                value={link}
                id="link"
                name="link"
                type="text"
                autoComplete="link"
                maxLength={65}
                className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              disabled={!validLink}
              onClick={() => setActiveSection("profile")}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
            >
              Import
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full ">
        <div className="pb-8 px-4 sm:px-10">
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex justify-start items-center w-full">
              <div className="flex justify-start items-start flex-grow gap-1.5">
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-900"
                  onClick={() => setActiveSection("cv")}
                ></div>
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-300"
                  onClick={() => setActiveSection("projects")}
                ></div>
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-300"
                  onClick={() => setActiveSection("blogs")}
                ></div>
              </div>
              <div className="flex justify-start items-center h-8 overflow-hidden gap-2 py-2 rounded">
                <p
                  onClick={() => setActiveSection("projects")}
                  className="text-sm font-medium text-left text-zinc-700"
                >
                  Next
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OnboardingProjects: FC = () => {
  const [, setActiveSection] = useRecoilState(activeSectionState);
  const [githubConnected, setGithubConnected] = useState(false);
  const [gitlabConnected, setGitlabConnected] = useState(false);

  return (
    <>
      <div className="relative h-64">
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10">
          <GGIcons />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="py-8 px-4 sm:px-10">
        <div className="flex flex-col justify-start items-start gap-4">
          <p className="text-xl font-semibold text-left text-zinc-900">
            Connect your Projects
          </p>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex justify-start items-center h-9 overflow-hidden gap-3 rounded w-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M12.0004 2.40002C10.7397 2.40002 9.49136 2.6545 8.32663 3.14892C7.1619 3.64335 6.10361 4.36803 5.21217 5.28161C3.41182 7.12665 2.40039 9.62907 2.40039 12.2384C2.40039 16.5869 5.15559 20.2763 8.96679 21.5848C9.44679 21.6635 9.60039 21.3585 9.60039 21.0929V19.4302C6.94119 20.0205 6.37479 18.1119 6.37479 18.1119C5.93319 16.9706 5.30919 16.6656 5.30919 16.6656C4.43559 16.0556 5.37639 16.0753 5.37639 16.0753C6.33639 16.1442 6.84519 17.0887 6.84519 17.0887C7.68039 18.5841 9.09159 18.1414 9.63879 17.9052C9.72519 17.2658 9.97479 16.8329 10.2436 16.5869C8.11239 16.341 5.87559 15.4949 5.87559 11.7464C5.87559 10.6544 6.24039 9.77878 6.86439 9.08026C6.76839 8.8343 6.43239 7.81111 6.96039 6.48294C6.96039 6.48294 7.76679 6.2173 9.60039 7.48645C10.3588 7.27 11.1844 7.16178 12.0004 7.16178C12.8164 7.16178 13.642 7.27 14.4004 7.48645C16.234 6.2173 17.0404 6.48294 17.0404 6.48294C17.5684 7.81111 17.2324 8.8343 17.1364 9.08026C17.7604 9.77878 18.1252 10.6544 18.1252 11.7464C18.1252 15.5047 15.8788 16.3311 13.738 16.5771C14.0836 16.8821 14.4004 17.4822 14.4004 18.3972V21.0929C14.4004 21.3585 14.554 21.6733 15.0436 21.5848C18.8548 20.2664 21.6004 16.5869 21.6004 12.2384C21.6004 10.9464 21.3521 9.66704 20.8696 8.47339C20.3872 7.27975 19.6801 6.19518 18.7886 5.28161C17.8972 4.36803 16.8389 3.64335 15.6742 3.14892C14.5094 2.6545 13.2611 2.40002 12.0004 2.40002Z"
                  fill="#52525B"
                ></path>
              </svg>
              <div className="flex justify-start items-center flex-grow gap-2">
                <p className="text-sm font-medium text-left text-zinc-900">
                  Github
                </p>
              </div>

              {!githubConnected ? (
                <button
                  type="button"
                  onClick={() => setGithubConnected(!githubConnected)}
                  className="flex justify-start items-center h-8 overflow-hidden gap-2 px-4 py-2 rounded border border-zinc-200"
                >
                  <p className="text-sm font-medium text-left text-zinc-700">
                    Connect
                  </p>
                </button>
              ) : (
                <CheckIcon />
              )}
            </div>
            <div className="flex justify-start items-center h-9 overflow-hidden gap-3 rounded w-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M21.0007 14.6259L12.7887 20.3084C12.5584 20.4722 12.2829 20.5602 12.0004 20.5602C11.7179 20.5602 11.4423 20.4722 11.2121 20.3084L3.00012 14.6259C2.76529 14.463 2.58619 14.2319 2.48703 13.9639C2.38787 13.6958 2.37345 13.4038 2.44572 13.1273L4.81057 4.24832C4.86597 4.03336 4.98874 3.84177 5.16089 3.70162C5.33305 3.56147 5.54555 3.48011 5.76729 3.46946C5.98903 3.45881 6.20835 3.51942 6.39315 3.64243C6.57795 3.76544 6.71851 3.94437 6.79426 4.15304L8.57873 8.92603H15.4221L17.2065 4.15304C17.2823 3.94437 17.4228 3.76544 17.6076 3.64243C17.7924 3.51942 18.0118 3.45881 18.2335 3.46946C18.4552 3.48011 18.6677 3.56147 18.8399 3.70162C19.012 3.84177 19.1348 4.03336 19.1902 4.24832L21.5551 13.1273C21.6273 13.4038 21.6129 13.6958 21.5138 13.9639C21.4146 14.2319 21.2355 14.463 21.0007 14.6259Z"
                  fill="#52525B"
                ></path>
              </svg>
              <div className="flex justify-start items-center flex-grow gap-2">
                <p className="text-sm font-medium text-left text-zinc-900">
                  Gitlab
                </p>
              </div>
              {!gitlabConnected ? (
                <button
                  type="button"
                  onClick={() => setGitlabConnected(!gitlabConnected)}
                  className="flex justify-start items-center h-8 overflow-hidden gap-2 px-4 py-2 rounded border border-zinc-200"
                >
                  <p className="text-sm font-medium text-left text-zinc-700">
                    Connect
                  </p>
                </button>
              ) : (
                <CheckIcon />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full ">
        <div className="pb-8 px-4 sm:px-10">
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex justify-start items-center w-full">
              <div className="flex justify-start items-start flex-grow gap-1.5">
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-300"
                  onClick={() => setActiveSection("cv")}
                ></div>
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-900"
                  onClick={() => setActiveSection("projects")}
                ></div>
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-300"
                  onClick={() => setActiveSection("blogs")}
                ></div>
              </div>
              <div className="flex justify-start items-center h-8 overflow-hidden gap-2 py-2 rounded">
                <button
                  type="button"
                  disabled={!githubConnected && !gitlabConnected}
                  onClick={() => setActiveSection("blogs")}
                  className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OnboardingBlogs: FC = () => {
  const [, setActiveSection] = useRecoilState(activeSectionState);
  const [devtoConnected, setDevtoConnected] = useState(false);
  const [mediumConnected, setMediumConnected] = useState(false);

  return (
    <>
      <div className="relative h-64">
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10">
          <BlogsIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="py-8 px-4 sm:px-10">
        <div className="flex flex-col justify-start items-start gap-4">
          <p className="text-xl font-semibold text-left text-zinc-900">
            Connect your Blogs
          </p>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex justify-start items-center h-9 overflow-hidden gap-3 rounded w-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              preserveAspectRatio="none"
            >
              <path
                d="M5.69437 8.02258C5.53355 7.90238 5.37233 7.84229 5.21151 7.84229H4.48869V12.1722H5.21193C5.37274 12.1722 5.53397 12.1121 5.69478 11.9919C5.85559 11.8717 5.936 11.6914 5.936 11.4506V8.56387C5.93558 8.32348 5.85476 8.14277 5.69437 8.02258ZM17.4643 0.715942H2.53532C1.53232 0.715942 0.718307 1.52788 0.71582 2.53131V17.4687C0.718307 18.4721 1.53232 19.2841 2.53532 19.2841H17.4643C18.4677 19.2841 19.2813 18.4721 19.2838 17.4687V2.53131C19.2813 1.52788 18.4673 0.715942 17.4643 0.715942ZM7.10686 11.4585C7.10686 12.2381 6.62567 13.4194 5.10251 13.4169H3.1794V6.5591H5.14313C6.61199 6.5591 7.10603 7.73867 7.10645 8.5187L7.10686 11.4585ZM11.2797 7.78385H9.07142V9.37623H10.4213V10.6018H9.07142V12.1938H11.2801V13.4194H8.70296C8.24042 13.4314 7.8558 13.0658 7.84419 12.6033V7.41787C7.833 6.95574 8.19897 6.57194 8.6611 6.56034H11.2801L11.2797 7.78385ZM15.5752 12.5622C15.0281 13.8367 14.0479 13.5831 13.609 12.5622L12.012 6.56075H13.362L14.5933 11.2741L15.8189 6.56075H17.1692L15.5752 12.5622Z"
                fill="#52525B"
              ></path>
            </svg>
              <div className="flex justify-start items-center flex-grow gap-2">
                <p className="text-sm font-medium text-left text-zinc-900">
                  Dev.to
                </p>
              </div>

              {!devtoConnected ? (
                <button
                  type="button"
                  onClick={() => setDevtoConnected(!devtoConnected)}
                  className="flex justify-start items-center h-8 overflow-hidden gap-2 px-4 py-2 rounded border border-zinc-200"
                >
                  <p className="text-sm font-medium text-left text-zinc-700">
                    Connect
                  </p>
                </button>
              ) : (
                <CheckIcon />
              )}
            </div>
            <div className="flex justify-start items-center h-9 overflow-hidden gap-3 rounded w-full">
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              preserveAspectRatio="none"
            >
              <path
                d="M5.64062 0.320679C8.75602 0.320679 11.2812 2.86359 11.2812 6.00009C11.2812 9.13668 8.75578 11.6794 5.64062 11.6794C2.52562 11.6794 0 9.13668 0 6.00009C0 2.86367 2.52539 0.320679 5.64062 0.320679ZM14.6484 0.653337C16.2061 0.653337 17.4688 3.04695 17.4688 6.00009H17.4691C17.4691 8.95254 16.2063 11.3469 14.6488 11.3469C13.0912 11.3469 11.8284 8.95254 11.8284 6.00009C11.8284 3.04773 13.0909 0.653337 14.6485 0.653337H14.6484ZM19.008 1.21029C19.5558 1.21029 20 3.35476 20 6.00017C20 8.64472 19.5559 10.7901 19.008 10.7901C18.4602 10.7901 18.0163 8.64535 18.0163 6.00017C18.0163 3.35492 18.4604 1.21029 19.008 1.21029Z"
                fill="#52525B"
              ></path>
            </svg>
              <div className="flex justify-start items-center flex-grow gap-2">
                <p className="text-sm font-medium text-left text-zinc-900">
                  Medium
                </p>
              </div>
              {!mediumConnected ? (
                <button
                  type="button"
                  onClick={() => setMediumConnected(!mediumConnected)}
                  className="flex justify-start items-center h-8 overflow-hidden gap-2 px-4 py-2 rounded border border-zinc-200"
                >
                  <p className="text-sm font-medium text-left text-zinc-700">
                    Connect
                  </p>
                </button>
              ) : (
                <CheckIcon />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full ">
        <div className="pb-8 px-4 sm:px-10">
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex justify-start items-center w-full">
              <div className="flex justify-start items-start flex-grow gap-1.5">
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-300"
                  onClick={() => setActiveSection("cv")}
                ></div>
                <div
                  className="w-[5px] h-[5px] rounded-[3px] bg-zinc-300"
                  onClick={() => setActiveSection("projects")}
                ></div>
                <div
                  className="w-[5px] h-[5px] rounded-[3px]  bg-zinc-900"
                  onClick={() => setActiveSection("blogs")}
                ></div>
              </div>
              <div className="flex justify-start items-center h-8 overflow-hidden gap-2 py-2 rounded">
                <button
                  type="button"
                  disabled={!devtoConnected && !mediumConnected}
                  onClick={() => setActiveSection("store")}
                  className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
