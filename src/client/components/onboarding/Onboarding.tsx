import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Router, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateUserMutation } from "../../graphql/updateUser.generated";
import { useUpsertSiteMutation } from "../../graphql/upsertSite.generated";
import { onboardingState } from "../../store/onboarding";
import { siteSlugState, siteState } from "../../store/site";
import { subdomainCardOpenState } from "../../store/ui/modals";
import {
  activeSectionState,
  OnboardingSection,
} from "../../store/ui/onboarding";
import { currentUserState } from "../../store/user";
import ImageUpload from "../crop/ImageUpload";
import Gradient from "../Gradient";
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
  const [activeSection] = useRecoilState(activeSectionState);
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
      <div className="relative h-[50vh] sm:h-64">
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10">
          <Logo />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="mt-auto py-6 px-4 sm:px-6">
        <div className="flex flex-col justify-start items-start gap-2">
          <p className="text-xl font-semibold text-left text-zinc-900">
            Welcome on Stage
          </p>
          <p className="text-xs font-medium text-left text-zinc-500">
            Let’s get started, by connecting some API’s to your site.
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
    <div className="flex flex-col py-6 px-4 sm:px-6 h-screen sm:h-full sm:min-h-[530px]">
      <div className="flex flex-col justify-start items-start gap-2">
        <p className="text-xl font-semibold text-left text-zinc-900">
          Basic Information
        </p>
        <p className="text-xs font-medium text-left text-zinc-500">
          <span className="text-xs font-medium text-left text-zinc-500">
            To generate the site we need some basic{" "}
          </span>
          <br />
          <span className="text-xs font-medium text-left text-zinc-500">
            information from you.
          </span>
        </p>
      </div>
      <div className="mt-4 flex flex-col justify-start items-start gap-4">
        <ImageUpload imageUrl={user.image ? user.image : ""} uploadType={"profileImage"} size="w-12 h-12"/>
        <div className="mt-2 flex gap-4">
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="w-full">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-zinc-600"
              >
                First Name
              </label>
              <div className="mt-1 relative">
                <input
                  onChange={(e) => {
                    setUser({ ...user, firstName: e.target.value });
                  }}
                  value={user.firstName || ""}
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  type="text"
                  autoComplete="firstname"
                  maxLength={50}
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="w-full">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-zinc-600"
              >
                Last name
              </label>
              <div className="mt-1 relative">
                <input
                  onChange={(e) => {
                    setUser({ ...user, lastName: e.target.value });
                  }}
                  value={user.lastName || ""}
                  id="lastname"
                  name="lastname"
                  placeholder="Surname"
                  type="text"
                  autoComplete="lastname"
                  maxLength={50}
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

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
                  setOnboarding({ ...onboarding, tagline: e.target.value });
                }}
                value={onboarding.tagline}
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
          <div className="mt-1 relative">
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
              className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-between items-start pt-2">
            <p className="text-xs text-left text-zinc-500">
              Write a few sentences about yourself.
            </p>
            <p className="text-xs text-left text-zinc-500">
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
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const OnboardingSubdomain: FC = () => {
  const [onboarding, setOnboarding] = useRecoilState(onboardingState);
  const user = useRecoilValue(currentUserState);
  const [, setSubdomainCardOpen] = useRecoilState(subdomainCardOpenState);
  const [subdomainValid, setSubdomainValid] = useState(false);
  const [, upsertSite] = useUpsertSiteMutation();

  const router = useRouter()
  
  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setOnboarding({ ...onboarding, subdomain: value });
      setSubdomainValid(false);
    } else if (value.match(/^[a-z]+$/)) {
      setOnboarding({ ...onboarding, subdomain: value });
      if (value.length > 3) {
        setSubdomainValid(true);
      } else {
        setSubdomainValid(false);
      }
    }
  };

  const handleUpsertSite = async () => {
    setSubdomainCardOpen(false);
    if (subdomainValid) {
      const response = await upsertSite({
        subdomain: onboarding.subdomain,
        tagline: onboarding.tagline,
        bio: onboarding.bio,
      })

      if(response.data?.upsertSite){
        const subdomain = response.data.upsertSite.subdomain;
        setSubdomainCardOpen(false);
        if(subdomain) router.push(`/s/${subdomain}`);
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
  }, [onboarding, setOnboarding, user]);

  return (
    <>
      <div className="relative h-[50vh] sm:h-64">
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10">
          <DomainIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="mt-auto flex flex-col justify-start items-start gap-2 pt-8 px-4 sm:px-6">
        <p className="text-xl font-semibold text-left text-zinc-900">
          Get your alias
        </p>
        <p className="text-xs font-medium text-left text-zinc-500">
          The alias is the name which is displayed in your url.{" "}
          {onboarding.subdomain.length === 0 ? (
            <>
              For example: getstage.app/
              <span className="underline">nilsjacobsen</span>
            </>
          ) : (
            <>
              Your domain: getstage.app/
              <span className="underline">{onboarding.subdomain}</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col justify-start items-start gap-2 px-4 py-6 sm:px-6">
        <div className="w-full">
          <div className="w-full">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-zinc-600"
            >
              Alias
            </label>
            <div className="mt-1 relative">
              <input
                onChange={handleSubdomainChange}
                value={onboarding.subdomain}
                id="subdomain"
                maxLength={20}
                name="subdomain"
                type="text"
                autoComplete="subdomain"
                className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={!subdomainValid}
            onClick={() => {
              handleUpsertSite();
            }}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
          >
            Claim alias
          </button>
        </div>
      </div>
    </>
  );
};
