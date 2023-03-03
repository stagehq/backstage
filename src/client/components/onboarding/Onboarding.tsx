import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import slug from "slug";
import { reservedRoutes } from "../../../helper/reservedRoutes";
import { client } from "../../graphql/client";
import { GetValidSubdomainDocument } from "../../graphql/getValidSubdomain.generated";
import { useUpdateUserMutation } from "../../graphql/updateUser.generated";
import { useUpsertSiteMutation } from "../../graphql/upsertSite.generated";
import { onboardingState } from "../../store/onboarding";
import { subdomainCardOpenState } from "../../store/ui/modals";
import {
  activeSectionState,
  OnboardingSection,
} from "../../store/ui/onboarding";
import { currentUserState } from "../../store/user";
import ImageUpload from "../crop/ImageUpload";
import Gradient from "../Gradient";
import LoadingPage from "../loading/Page";
import LoginCard from "../LoginCard";
import Logo from "../Logo";
import { parseName } from "../modals/settings/helper/parseName";
import DomainIcon from "./visuals/DomainIcon";

const renderOnboardingSection = (activeSection: OnboardingSection) => {
  switch (activeSection) {
    case "start":
      return <OnboardingStart />;
    case "profile":
      return <OnboardingProfile />;
    case "subdomain":
      return <OnboardingSubdomain />;
    default:
      return <OnboardingStart />;
  }
};
const Onboarding: FC = () => {
  const [user, setUser] = useRecoilState(currentUserState);
  const [activeSection] = useRecoilState(activeSectionState);

  const router = useRouter();

  // if user has site, redirect to dashboard
  if (user?.sites && user.sites.length > 0) {
    router.push("/s");
    return <LoadingPage />;
  }

  return (
    <LoginCard>
      <div className="flex h-full flex-col sm:min-h-[530px]">
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
      <div className="relative h-[50vh] sm:h-64">
        <div className="absolute top-1/2 left-2/4 z-10 -translate-x-1/2 -translate-y-1/2">
          <Logo />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="mt-auto py-6 px-4 sm:px-6">
        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-left text-xl font-semibold text-zinc-900">
            Welcome on Stage
          </p>
          <p className="text-left text-xs font-medium text-zinc-500">
            Let’s get started, by connecting some API’s to your site.
          </p>
          <button
            type="button"
            onClick={() => setActiveSection("profile")}
            className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-zinc-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
};

const OnboardingProfile = () => {
  const [onboarding, setOnboarding] = useRecoilState(onboardingState);
  const [user, setUser] = useRecoilState(currentUserState);
  const [, setActiveSection] = useRecoilState(activeSectionState);

  const [, updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (!user) return;

    if (user.name && user.firstName === null && user.lastName === null) {
      const parsedName = parseName(user.name);
      setUser({
        ...user,
        firstName: parsedName.name,
        lastName: parsedName.lastName,
      });
    }

    if (user.mainSite?.bio && user.mainSite?.tagline) {
      setOnboarding({
        ...onboarding,
        bio: user.mainSite?.bio,
        tagline: user.mainSite?.tagline,
      });
    }
  }, [onboarding, setOnboarding, user, setUser]);

  const changeNames = () => {
    if (!user) return;
    updateUser({
      firstName: user.firstName,
      lastName: user.lastName,
    }).then((res) => {
      if (!res.data?.updateUser) {
        toast.error("Something went wrong");
        return;
      }
    });
  };

  if (!user) return null;

  return (
    <div className="flex h-screen flex-col py-6 px-4 sm:h-full sm:min-h-[530px] sm:px-6">
      <div className="flex flex-col items-start justify-start gap-2">
        <p className="text-left text-xl font-semibold text-zinc-900">
          Basic Information
        </p>
        <p className="text-left text-xs font-medium text-zinc-500">
          <span className="text-left text-xs font-medium text-zinc-500">
            To generate the site we need some basic{" "}
          </span>
          <br />
          <span className="text-left text-xs font-medium text-zinc-500">
            information from you.
          </span>
        </p>
      </div>
      <div className="mt-4 flex flex-col items-start justify-start gap-4">
        <ImageUpload
          imageUrl={user.image ? user.image : ""}
          uploadType={"profileImage"}
          size="w-12 h-12"
        />
        <div className="mt-2 flex gap-4">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="w-full">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-zinc-600"
              >
                First Name
              </label>
              <div className="relative mt-1">
                <input
                  onChange={(e) => {
                    setUser({ ...user, firstName: e.target.value });
                  }}
                  value={user.firstName || ""}
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="firstname"
                  maxLength={50}
                  className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="w-full">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-zinc-600"
              >
                Last name
              </label>
              <div className="relative mt-1">
                <input
                  onChange={(e) => {
                    setUser({ ...user, lastName: e.target.value });
                  }}
                  value={user.lastName || ""}
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                  maxLength={50}
                  className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-2">
          <div className="w-full">
            <label
              htmlFor="tagline"
              className="block text-sm font-medium text-zinc-600"
            >
              Tagline
            </label>
            <div className="relative mt-1">
              <input
                onChange={(e) => {
                  setOnboarding({ ...onboarding, tagline: e.target.value });
                }}
                value={onboarding.tagline}
                id="tagline"
                name="tagline"
                type="text"
                autoComplete="tagline"
                maxLength={65}
                className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
              />
            </div>
            <div className="flex items-start justify-between pt-2">
              <p className="text-left text-xs text-zinc-500">
                Write a short tagline.
              </p>
              <p className="text-left text-xs text-zinc-500">
                {onboarding.tagline.length}/65
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
          <div className="relative mt-1">
            <textarea
              onChange={(e) => {
                setOnboarding({ ...onboarding, bio: e.target.value });
              }}
              rows={4}
              value={onboarding.bio}
              id="bio"
              name="bio"
              autoComplete="bio"
              maxLength={250}
              className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
            />
          </div>
          <div className="flex items-start justify-between pt-2">
            <p className="text-left text-xs text-zinc-500">
              Write a few sentences about yourself.
            </p>
            <p className="text-left text-xs text-zinc-500">
              {onboarding.bio.length}/250
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <button
          type="button"
          disabled={
            onboarding.tagline === "" ||
            onboarding.bio === "" ||
            user.firstName === "" ||
            user.lastName === ""
          }
          onClick={() => {
            setActiveSection("subdomain");
            changeNames();
          }}
          className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-zinc-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const OnboardingSubdomain: FC = () => {
  const [onboarding, setOnboarding] = useRecoilState(onboardingState);
  const [user, setUser] = useRecoilState(currentUserState);
  const [, setSubdomainCardOpen] = useRecoilState(subdomainCardOpenState);
  const [subdomainValid, setSubdomainValid] = useState(false);
  const [subdomainTooShort, setSubdomainTooShort] = useState(true);
  const [, upsertSite] = useUpsertSiteMutation();

  const router = useRouter();

  // handle subdomain change
  const handleSubdomainChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOnboarding({
      ...onboarding,
      subdomain: slug(e.target.value, { lower: true }),
    });

    // Check if subdomain is valid
    if (e.target.value && e.target.value !== onboarding.subdomain) {
      await client
        .query(GetValidSubdomainDocument, {
          subdomain: e.target.value,
        })
        .toPromise()
        .then((result) => {
          if (result.data?.getValidSubdomain) {
            setSubdomainValid(false);
          } else {
            if (reservedRoutes.includes(e.target.value)) {
              setSubdomainValid(false);
            } else {
              setSubdomainValid(true);
            }
          }
        });
    }
  };

  const handleUpsertSite = async () => {
    setSubdomainCardOpen(false);
    if (subdomainValid) {
      const response = await upsertSite({
        subdomain: onboarding.subdomain,
        tagline: onboarding.tagline,
        bio: onboarding.bio,
        image: user?.image,
      });

      if (response.data?.upsertSite) {
        const subdomain = response.data.upsertSite.subdomain;
        setSubdomainCardOpen(false);
        if (!user) return null;
        setUser({
          ...user,
          sites: user.sites
            ? [...user?.sites, response.data.upsertSite]
            : [response.data.upsertSite],
        });
        if (subdomain) {
          window.location.href = `/s/${subdomain}`;
        }
      }
    }
  };

  useEffect(() => {
    if (user?.mainSite?.subdomain) {
      setOnboarding({
        ...onboarding,
        subdomain: user.mainSite.subdomain,
      });
      setSubdomainValid(true);
    }
    if (onboarding.subdomain && onboarding.subdomain.length < 3) {
      setSubdomainTooShort(true);
    } else {
      setSubdomainTooShort(false);
    }
  }, [onboarding, setOnboarding, user]);

  return (
    <>
      <div className="relative h-[50vh] sm:h-64">
        <div className="absolute top-1/2 left-2/4 z-10 -translate-x-1/2 -translate-y-1/2">
          <DomainIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="mt-auto flex flex-col items-start justify-start gap-2 px-4 pt-8 sm:px-6">
        <p className="text-left text-xl font-semibold text-zinc-900">
          Get your link
        </p>
        <p className="text-left text-xs font-medium text-zinc-500">
          The link is the name which is displayed in your url.{" "}
          {onboarding.subdomain.length === 0 ? (
            <>
              For example: getstage.app/
              <span className="underline">link</span>
            </>
          ) : (
            <>
              Your domain: getstage.app/
              <span className="underline">{onboarding.subdomain}</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 px-4 py-6 sm:px-6">
        <div className="w-full">
          <div className="w-full">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-zinc-600"
            >
              Link
            </label>
            <div className="relative mt-1">
              <input
                onChange={handleSubdomainChange}
                value={onboarding.subdomain}
                id="subdomain"
                maxLength={20}
                name="subdomain"
                type="text"
                autoComplete="subdomain"
                className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
              />
            </div>
            {!subdomainValid && onboarding.subdomain !== "" && (
              <p
                className="mt-2 text-left text-xs font-medium text-zinc-500"
                id="email-error"
              >
                This subdomain is already taken or not valid.
              </p>
            )}
            {subdomainTooShort && onboarding.subdomain !== "" && (
              <p
                className="mt-2 text-left text-xs font-medium text-zinc-500"
                id="email-error"
              >
                Your subdomain must be 3 characters or more.
              </p>
            )}
          </div>
          <button
            type="button"
            disabled={
              !onboarding.subdomain || subdomainTooShort || !subdomainValid
            }
            onClick={() => {
              if (!onboarding.subdomain || subdomainTooShort || !subdomainValid)
                return;
              handleUpsertSite();
            }}
            className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-zinc-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-30"
          >
            Let's get started 🎉
          </button>
        </div>
      </div>
    </>
  );
};
