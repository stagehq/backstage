import { decodeGlobalID } from "@pothos/plugin-relay";
import { AuthType } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StoreExtension } from "../../graphql/types.generated";
import {
  preferencesApiState,
  preferencesExtensionState,
  storeExtensionState,
} from "../../store/extensions";
import { siteSlugState, siteState } from "../../store/site";
import { preferencesOpenState } from "../../store/ui/modals";
import { activeSectionState } from "../../store/ui/onboarding";
import { currentUserState } from "../../store/user";
import Gradient from "../Gradient";
import { upsertExtension } from "../helper/upsertExtension";
import BlogsIcon from "./visuals/BlogsIcon";
import CheckIcon from "./visuals/CheckIcon";
import CvIcon from "./visuals/CvIcon";
import GGIcons from "./visuals/GGIcons";
import StoreIcon from "./visuals/StoreIcon";

const OnboardingDotMenu = () => {
  const [activeSection, setActiveSection] = useRecoilState(activeSectionState);

  return (
    <div className="flex flex-grow items-start justify-start gap-1.5">
      <div
        className={clsx(
          "h-[5px] w-[5px] rounded-[3px]",
          activeSection === "cv" ? "bg-zinc-900" : "bg-zinc-300"
        )}
        onClick={() => setActiveSection("cv")}
      ></div>
      <div
        className={clsx(
          "h-[5px] w-[5px] rounded-[3px]",
          activeSection === "projects" ? "bg-zinc-900" : "bg-zinc-300"
        )}
        onClick={() => setActiveSection("projects")}
      ></div>
      <div
        className={clsx(
          "h-[5px] w-[5px] rounded-[3px]",
          activeSection === "blogs" ? "bg-zinc-900" : "bg-zinc-300"
        )}
        onClick={() => setActiveSection("blogs")}
      ></div>
    </div>
  );
};

const OnboardingCv: FC = () => {
  const [link, setLink] = useState("");
  const [, setActiveSection] = useRecoilState(activeSectionState);

  const siteSlug = useRecoilValue(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  const user = useRecoilValue(currentUserState);
  const storeExtensions = useRecoilValue(storeExtensionState);

  // console.log(storeExtensions);
  // console.log(site);

  const [validLink, setValidLink] = useState(false);

  const isValidLink = (url: string): boolean => {
    // Regular expression to check for a valid LinkedIn profile URL
    const regex =
      /^https:\/\/(www\.)?linkedin\.com\/(mwlite\/|m\/)?in\/[a-zA-Z0-9_-]+\/?$/;
    return regex.test(url);
  };

  const handleCvUpdate = () => {
    if (site && isValidLink(link)) {
      if (!storeExtensions || !user) return;

      const storeExtensionId = "clbz5lknp001zpgpx6nbzmxez";
      const storeExtension = storeExtensions?.find(
        (extension) => decodeGlobalID(extension.id).id === storeExtensionId
      ) as StoreExtension | undefined;

      if (storeExtension && storeExtension.routes) {
        /* TODO: Update the apiConnectorName and key to dynamic values */
        upsertExtension({
          siteId: decodeGlobalID(site.id).id,
          storeExtensionId: storeExtensionId,
          userId: decodeGlobalID(user.id).id,
          routes: storeExtension.routes.map((route) => {
            return {
              id: decodeGlobalID(route.id).id,
              url: route.url ? route.url : "",
              apiConnector: {
                name: route.apiConnector?.name ? route.apiConnector.name : "",
              },
            };
          }),
          authType: AuthType.preferences,
          apiConnectorName: "linkedin",
          preferences: [
            {
              key: "linkedinUrl",
              value: link,
            },
          ],
        });
      }
    }
  };

  useEffect(() => {
    if (isValidLink(link)) {
      setValidLink(true);
    } else {
      setValidLink(false);
    }
  }, [link]);

  return (
    <>
      <div className="relative max-h-[50vh] grow sm:h-64">
        <div className="absolute top-1/2 left-2/4 z-10 -translate-x-1/2 -translate-y-1/2">
          <CvIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white"></div>
        <Gradient />
      </div>
      <div className="py-6 px-4 sm:px-6">
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="text-left text-xl font-semibold text-zinc-900">
            Connect your CV
          </p>
          <div className="w-full">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-zinc-600"
            >
              LinkedIn profile url
            </label>
            <div className="relative mt-1">
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
                className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              disabled={!validLink}
              onClick={() => {
                handleCvUpdate();
                setActiveSection("projects");
              }}
              className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-30"
            >
              Import
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full ">
        <div className="px-4 pb-8 sm:px-6">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex w-full items-center justify-start">
              <OnboardingDotMenu />
              <div className="flex h-8 items-center justify-start gap-2 overflow-hidden rounded py-2">
                <button
                  type="button"
                  onClick={() => setActiveSection("projects")}
                  className="flex justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-100 focus:ring-offset-2 disabled:opacity-30"
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

export const OnboardingProjects: FC = () => {
  const [, setActiveSection] = useRecoilState(activeSectionState);
  const [githubConnected, setGithubConnected] = useState(false);
  const [gitlabConnected, setGitlabConnected] = useState(false);

  const siteSlug = useRecoilValue(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  const user = useRecoilValue(currentUserState);
  const storeExtensions = useRecoilValue(storeExtensionState);

  const storeExtensionId = "clbz5lknp001ypgpx1i2lqafr";
  const storeExtension = storeExtensions?.find(
    (extension) => decodeGlobalID(extension.id).id === storeExtensionId
  ) as StoreExtension | undefined;

  // connect to github
  const handleGithubAuth = async () => {
    // await github.authorize();
    // // console.log(github.getTokens());
    // if (!github.getTokens()?.isExpired()) {
    //   // console.log(github.getTokens()?.idToken);
    //   if (!site || !user || !storeExtension || !storeExtension.routes) return;
    //   await upsertExtension({
    //     siteId: decodeGlobalID(site.id).id,
    //     storeExtensionId: storeExtensionId,
    //     userId: decodeGlobalID(user.id).id,
    //     routes: storeExtension.routes.map((route) => {
    //       return {
    //         id: decodeGlobalID(route.id).id,
    //         url: route.url ? route.url : "",
    //         apiConnector: {
    //           name: route.apiConnector?.name ? route.apiConnector.name : "",
    //         },
    //       };
    //     }),
    //     oAuthId: github.getTokens()?.idToken,
    //     authType: AuthType.oAuth,
    //     apiConnectorName: "github",
    //   });
    //   setGithubConnected(true);
    // }
  };

  // connect to gitlab
  const handleGitlabAuth = async () => {
    // await gitlab.authorize();
    // if (!gitlab.getTokens()?.isExpired()) {
    //   if (!site || !user || !storeExtension || !storeExtension.routes) return;
    //   await upsertExtension({
    //     siteId: decodeGlobalID(site.id).id,
    //     storeExtensionId: storeExtensionId,
    //     userId: decodeGlobalID(user.id).id,
    //     routes: storeExtension.routes.map((route) => {
    //       return {
    //         id: decodeGlobalID(route.id).id,
    //         url: route.url ? route.url : "",
    //         apiConnector: {
    //           name: route.apiConnector?.name ? route.apiConnector.name : "",
    //         },
    //       };
    //     }),
    //     oAuthId: gitlab.getTokens()?.idToken,
    //     authType: AuthType.oAuth,
    //     apiConnectorName: "gitlab",
    //   });
    //   setGitlabConnected(true);
    // }
  };

  // //get initial state
  // useEffect(() => {
  //   const isGithubExpired = github.getTokens()?.isExpired();
  //   const isGitlabExpired = gitlab.getTokens()?.isExpired();

  //   if (!isGithubExpired) {
  //     setGithubConnected(true);
  //   }

  //   if (!isGitlabExpired) {
  //     setGitlabConnected(true);
  //   }
  // }, []);

  return (
    <>
      <div className="relative max-h-[50vh] grow sm:h-64">
        <div className="absolute top-1/2 left-2/4 z-10 -translate-x-1/2 -translate-y-1/2">
          <GGIcons />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white"></div>
        <Gradient />
      </div>
      <div className="py-6 px-4 sm:px-6">
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="text-left text-xl font-semibold text-zinc-900">
            Connect your Projects
          </p>

          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex h-9 w-full items-center justify-start gap-3 overflow-hidden rounded">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M12.0004 2.40002C10.7397 2.40002 9.49136 2.6545 8.32663 3.14892C7.1619 3.64335 6.10361 4.36803 5.21217 5.28161C3.41182 7.12665 2.40039 9.62907 2.40039 12.2384C2.40039 16.5869 5.15559 20.2763 8.96679 21.5848C9.44679 21.6635 9.60039 21.3585 9.60039 21.0929V19.4302C6.94119 20.0205 6.37479 18.1119 6.37479 18.1119C5.93319 16.9706 5.30919 16.6656 5.30919 16.6656C4.43559 16.0556 5.37639 16.0753 5.37639 16.0753C6.33639 16.1442 6.84519 17.0887 6.84519 17.0887C7.68039 18.5841 9.09159 18.1414 9.63879 17.9052C9.72519 17.2658 9.97479 16.8329 10.2436 16.5869C8.11239 16.341 5.87559 15.4949 5.87559 11.7464C5.87559 10.6544 6.24039 9.77878 6.86439 9.08026C6.76839 8.8343 6.43239 7.81111 6.96039 6.48294C6.96039 6.48294 7.76679 6.2173 9.60039 7.48645C10.3588 7.27 11.1844 7.16178 12.0004 7.16178C12.8164 7.16178 13.642 7.27 14.4004 7.48645C16.234 6.2173 17.0404 6.48294 17.0404 6.48294C17.5684 7.81111 17.2324 8.8343 17.1364 9.08026C17.7604 9.77878 18.1252 10.6544 18.1252 11.7464C18.1252 15.5047 15.8788 16.3311 13.738 16.5771C14.0836 16.8821 14.4004 17.4822 14.4004 18.3972V21.0929C14.4004 21.3585 14.554 21.6733 15.0436 21.5848C18.8548 20.2664 21.6004 16.5869 21.6004 12.2384C21.6004 10.9464 21.3521 9.66704 20.8696 8.47339C20.3872 7.27975 19.6801 6.19518 18.7886 5.28161C17.8972 4.36803 16.8389 3.64335 15.6742 3.14892C14.5094 2.6545 13.2611 2.40002 12.0004 2.40002Z"
                  fill="#52525B"
                ></path>
              </svg>
              <div className="flex flex-grow items-center justify-start gap-2">
                <p className="text-left text-sm font-medium text-zinc-900">
                  Github
                </p>
              </div>

              {!githubConnected ? (
                <button
                  type="button"
                  onClick={() => {
                    handleGithubAuth();
                  }}
                  className="flex h-8 items-center justify-start gap-2 overflow-hidden rounded border border-zinc-200 px-4 py-2"
                >
                  <p className="text-left text-sm font-medium text-zinc-700">
                    Connect
                  </p>
                </button>
              ) : (
                <CheckIcon />
              )}
            </div>
            <div className="flex h-9 w-full items-center justify-start gap-3 overflow-hidden rounded">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M21.0007 14.6259L12.7887 20.3084C12.5584 20.4722 12.2829 20.5602 12.0004 20.5602C11.7179 20.5602 11.4423 20.4722 11.2121 20.3084L3.00012 14.6259C2.76529 14.463 2.58619 14.2319 2.48703 13.9639C2.38787 13.6958 2.37345 13.4038 2.44572 13.1273L4.81057 4.24832C4.86597 4.03336 4.98874 3.84177 5.16089 3.70162C5.33305 3.56147 5.54555 3.48011 5.76729 3.46946C5.98903 3.45881 6.20835 3.51942 6.39315 3.64243C6.57795 3.76544 6.71851 3.94437 6.79426 4.15304L8.57873 8.92603H15.4221L17.2065 4.15304C17.2823 3.94437 17.4228 3.76544 17.6076 3.64243C17.7924 3.51942 18.0118 3.45881 18.2335 3.46946C18.4552 3.48011 18.6677 3.56147 18.8399 3.70162C19.012 3.84177 19.1348 4.03336 19.1902 4.24832L21.5551 13.1273C21.6273 13.4038 21.6129 13.6958 21.5138 13.9639C21.4146 14.2319 21.2355 14.463 21.0007 14.6259Z"
                  fill="#52525B"
                ></path>
              </svg>
              <div className="flex flex-grow items-center justify-start gap-2">
                <p className="text-left text-sm font-medium text-zinc-900">
                  Gitlab
                </p>
              </div>
              {!gitlabConnected ? (
                <button
                  type="button"
                  onClick={() => {
                    handleGitlabAuth();
                  }}
                  className="flex h-8 items-center justify-start gap-2 overflow-hidden rounded border border-zinc-200 px-4 py-2"
                >
                  <p className="text-left text-sm font-medium text-zinc-700">
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
        <div className="px-4 pb-8 sm:px-6">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex w-full items-center justify-start">
              <OnboardingDotMenu />
              <div className="flex h-8 items-center justify-start gap-2 overflow-hidden rounded py-2">
                <button
                  type="button"
                  disabled={!githubConnected && !gitlabConnected}
                  onClick={() => setActiveSection("blogs")}
                  className="flex justify-center rounded-md border border-transparent bg-zinc-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-30"
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

export const OnboardingBlogs: FC = () => {
  const [, setActiveSection] = useRecoilState(activeSectionState);

  // open preferences modal recoil state
  const [, setOpenPreferencesModal] = useRecoilState(preferencesOpenState);

  // recoil state for prefernece extension
  const [, setPreferencesExtension] = useRecoilState(preferencesExtensionState);
  const [, setPreferencesApi] = useRecoilState(preferencesApiState);

  const storeExtensions = useRecoilValue(storeExtensionState);

  const [devtoConnected, setDevtoConnected] = useState(false);
  const [mediumConnected, setMediumConnected] = useState(false);

  const handleDevToConnect = () => {
    if (!storeExtensions) return;
    const devtoExtension = storeExtensions.find(
      (extension) =>
        decodeGlobalID(extension.id).id === "clbz5lknp001zpgpx4nboixez" // DevTo
    );

    if (devtoExtension) {
      // console.log("moin");
      setPreferencesApi("devto");
      setPreferencesExtension(devtoExtension);
      setOpenPreferencesModal(true);
      setDevtoConnected(true);
    }
  };

  return (
    <>
      <div className="relative max-h-[50vh] grow sm:h-64">
        <div className="absolute top-1/2 left-2/4 z-10 -translate-x-1/2 -translate-y-1/2">
          <BlogsIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white"></div>
        <Gradient />
      </div>
      <div className="py-6 px-4 sm:px-6">
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="text-left text-xl font-semibold text-zinc-900">
            Connect your Blogs
          </p>

          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex h-9 w-full items-center justify-start gap-3 overflow-hidden rounded">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M5.69437 8.02258C5.53355 7.90238 5.37233 7.84229 5.21151 7.84229H4.48869V12.1722H5.21193C5.37274 12.1722 5.53397 12.1121 5.69478 11.9919C5.85559 11.8717 5.936 11.6914 5.936 11.4506V8.56387C5.93558 8.32348 5.85476 8.14277 5.69437 8.02258ZM17.4643 0.715942H2.53532C1.53232 0.715942 0.718307 1.52788 0.71582 2.53131V17.4687C0.718307 18.4721 1.53232 19.2841 2.53532 19.2841H17.4643C18.4677 19.2841 19.2813 18.4721 19.2838 17.4687V2.53131C19.2813 1.52788 18.4673 0.715942 17.4643 0.715942ZM7.10686 11.4585C7.10686 12.2381 6.62567 13.4194 5.10251 13.4169H3.1794V6.5591H5.14313C6.61199 6.5591 7.10603 7.73867 7.10645 8.5187L7.10686 11.4585ZM11.2797 7.78385H9.07142V9.37623H10.4213V10.6018H9.07142V12.1938H11.2801V13.4194H8.70296C8.24042 13.4314 7.8558 13.0658 7.84419 12.6033V7.41787C7.833 6.95574 8.19897 6.57194 8.6611 6.56034H11.2801L11.2797 7.78385ZM15.5752 12.5622C15.0281 13.8367 14.0479 13.5831 13.609 12.5622L12.012 6.56075H13.362L14.5933 11.2741L15.8189 6.56075H17.1692L15.5752 12.5622Z"
                  fill="#52525B"
                ></path>
              </svg>
              <div className="flex flex-grow items-center justify-start gap-2">
                <p className="text-left text-sm font-medium text-zinc-900">
                  Dev.to
                </p>
              </div>

              {!devtoConnected ? (
                <button
                  type="button"
                  onClick={() => handleDevToConnect()}
                  className="flex h-8 items-center justify-start gap-2 overflow-hidden rounded border border-zinc-200 px-4 py-2"
                >
                  <p className="text-left text-sm font-medium text-zinc-700">
                    Connect
                  </p>
                </button>
              ) : (
                <CheckIcon />
              )}
            </div>
            <div className="flex h-9 w-full items-center justify-start gap-3 overflow-hidden rounded">
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M5.64062 0.320679C8.75602 0.320679 11.2812 2.86359 11.2812 6.00009C11.2812 9.13668 8.75578 11.6794 5.64062 11.6794C2.52562 11.6794 0 9.13668 0 6.00009C0 2.86367 2.52539 0.320679 5.64062 0.320679ZM14.6484 0.653337C16.2061 0.653337 17.4688 3.04695 17.4688 6.00009H17.4691C17.4691 8.95254 16.2063 11.3469 14.6488 11.3469C13.0912 11.3469 11.8284 8.95254 11.8284 6.00009C11.8284 3.04773 13.0909 0.653337 14.6485 0.653337H14.6484ZM19.008 1.21029C19.5558 1.21029 20 3.35476 20 6.00017C20 8.64472 19.5559 10.7901 19.008 10.7901C18.4602 10.7901 18.0163 8.64535 18.0163 6.00017C18.0163 3.35492 18.4604 1.21029 19.008 1.21029Z"
                  fill="#52525B"
                ></path>
              </svg>
              <div className="flex flex-grow items-center justify-start gap-2">
                <p className="text-left text-sm font-medium text-zinc-900">
                  Medium
                </p>
              </div>
              {!mediumConnected ? (
                <button
                  type="button"
                  onClick={() => setMediumConnected(!mediumConnected)}
                  className="flex h-8 items-center justify-start gap-2 overflow-hidden rounded border border-zinc-200 px-4 py-2"
                >
                  <p className="text-left text-sm font-medium text-zinc-700">
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
        <div className="px-4 pb-8 sm:px-6">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex w-full items-center justify-start">
              <OnboardingDotMenu />
              <div className="flex h-8 items-center justify-start gap-2 overflow-hidden rounded py-2">
                <button
                  type="button"
                  disabled={!devtoConnected && !mediumConnected}
                  onClick={() => setActiveSection("store")}
                  className="flex justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-30"
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

export const OnboardingStore: FC = () => {
  const [, setActiveSection] = useRecoilState(activeSectionState);

  return (
    <>
      <div className="relative max-h-[50vh] grow sm:h-64">
        <div className="absolute top-1/2 left-2/4 z-10 -translate-x-1/2 -translate-y-1/2">
          <StoreIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white"></div>
        <Gradient />
      </div>
      <div className="mt-auto py-6 px-4 sm:px-6">
        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-left text-xl font-semibold text-zinc-900">
            More? Check out the store
          </p>
          <p className="text-left text-xs font-medium text-zinc-500">
            In our extension store your can find extensions for the latest
            tools, platforms and services.
          </p>
          <Link href={"/s"}>
            <button
              type="button"
              onClick={() => setActiveSection("store")}
              className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
            >
              Let's go!
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const OnboardingDone: FC = () => {
  return (
    <div>
      <h1>Onboarding Done</h1>
    </div>
  );
};
