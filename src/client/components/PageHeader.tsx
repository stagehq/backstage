import {
  LinkIcon,
  MoonIcon,
  PlusSmallIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { decodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  SiBandcamp,
  SiBehance,
  SiDribbble,
  SiFacebook,
  SiFigma,
  SiGithub,
  SiGitlab,
  SiInstagram,
  SiLinkedin,
  SiPinterest,
  SiReddit,
  SiSnapchat,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
  SiTwitch,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateSiteHeaderMutation } from "../graphql/updateSiteHeader.generated";
import { handleDynamicHeight } from "../helper/racingBuffer";
import { isrDataState, isrState } from "../store/isr";
import { siteSlugState, siteState } from "../store/site";
import { siteSettingsOpenState } from "../store/ui/modals";
import { themeState } from "../store/ui/theme";
import { currentUserState, isrUserState } from "../store/user";
import ImageUpload from "./crop/ImageUpload";
import { SocialsType } from "./modals/sitesettings/Socials";

interface PageHeaderProps {
  disabled?: boolean;
}

export const PageHeader: FC<PageHeaderProps> = ({ disabled = false }) => {
  //refs
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const taglineRef = useRef<HTMLTextAreaElement>(null);

  //local state
  const [bio, setBio] = useState<string | null>(null);
  const [tagline, setTagline] = useState<string | null>(null);

  //fetches
  const [, updateSiteHeader] = useUpdateSiteHeaderMutation();

  //state
  //const siteSlug = useRecoilValue(siteSlugState);
  const [isIsrMode] = useRecoilState(isrState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(
    isIsrMode ? isrDataState : siteState(siteSlug)
  );

  const [theme, setTheme] = useRecoilState(themeState);
  const [siteSettingsOpen, setSiteSettingsOpen] = useRecoilState(
    siteSettingsOpenState
  );
  const [user, setUser] = useRecoilState(
    isIsrMode ? isrUserState : currentUserState
  );

  // useEffect(() => {
  //   // console.log(site);
  // }, [site]);

  //set initial value
  useEffect(() => {
    setTagline(site?.tagline ? site.tagline : "");
  }, [site?.tagline]);
  useEffect(() => {
    setBio(site?.bio ? site.bio : "");
  }, [site?.bio]);

  //handle sizing
  useEffect(() => {
    handleDynamicHeight(bioRef);
  }, [bioRef, bio]);

  useEffect(() => {
    handleDynamicHeight(taglineRef);
  }, [taglineRef, tagline]);

  //handle window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    handleDynamicHeight(bioRef);
    handleDynamicHeight(taglineRef);
  };

  const handleBlur = async () => {
    if (bio !== site?.bio || tagline != site?.tagline) {
      if (site?.id) {
        const response = await updateSiteHeader({
          siteId: decodeGlobalID(site?.id).id,
          bio: bio ? bio : "",
          tagline: tagline ? tagline : "",
        });
        if (!response.data?.updateSiteHeader) {
          // console.log(
          //   "We're sorry! Something went wrong while updating the header."
          // );
          toast.error(
            "We're sorry! Something went wrong while updating the header."
          );
        } else {
          // console.log(response);
          setSite({
            ...site,
            bio: response.data.updateSiteHeader.bio
              ? response.data.updateSiteHeader.bio
              : site.bio,
            tagline: response.data.updateSiteHeader.tagline
              ? response.data.updateSiteHeader.tagline
              : site.tagline,
          });
          if (!user) return null;
          setUser({
            ...user,
            sites: user.sites
              ? user.sites.map((site) => {
                  if (!response?.data?.updateSiteHeader) return site;
                  if (
                    site.subdomain === response.data.updateSiteHeader.subdomain
                  ) {
                    return {
                      ...site,
                      ...response.data.updateSiteHeader,
                    };
                  }
                  return site;
                })
              : [response.data.updateSiteHeader],
          });
        }
      } else {
        // console.log("Need site object for update");
        toast.error("Something went wrong!");
      }
    }
  };

  if (!site) return null;

  return (
    <div className="flex flex-col items-start justify-start gap-[54px] pt-6 @container">
      <div className="flex items-start justify-end gap-2 self-stretch">
        <button
          className="relative flex cursor-pointer items-start justify-start gap-2 rounded-full bg-zinc-100/40 p-2 ring-1 ring-zinc-900/5 backdrop-blur focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-800/90 dark:ring-white/30 dark:focus:ring-zinc-300"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <SunIcon className="h-5 w-5 text-zinc-600" />
          ) : (
            <MoonIcon className="h-5 w-5 text-zinc-300" />
          )}
        </button>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-8 self-stretch @3xl:w-3/4 @6xl:w-1/2">
        <ImageUpload
          imageUrl={site.image ? site.image : ""}
          uploadType="siteImage"
          mutationId={site.id}
          size="w-20 h-20"
          disabled={disabled}
        />
        <div className="flex w-full flex-col gap-4">
          <textarea
            ref={taglineRef}
            value={tagline ? tagline : ""}
            onChange={(e) => setTagline(e.target.value)}
            onBlur={() => handleBlur()}
            id="tagline"
            placeholder="Enter tagline..."
            className={clsx(
              "-ml-4 block w-full resize-none border-0 border-l-2 border-transparent bg-white py-0 px-0 pl-4 text-2xl font-bold text-zinc-800 placeholder-zinc-300 dark:bg-zinc-900 dark:text-zinc-200 lg:text-4xl",
              !disabled
                ? "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-transparent active:border-zinc-600 hover:dark:border-zinc-600 focus:dark:border-zinc-300 active:dark:border-zinc-300"
                : "focus:border-white focus:ring-0 dark:focus:border-zinc-900"
            )}
            readOnly={disabled}
          />
          <textarea
            ref={bioRef}
            value={bio ? bio : ""}
            onChange={(e) => setBio(e.target.value)}
            onBlur={() => handleBlur()}
            id="bio"
            placeholder="Enter bio..."
            className={clsx(
              "-ml-4 block w-full resize-none border-0 border-l-2 border-transparent bg-white py-0 px-0 pl-4 text-sm text-zinc-800 placeholder-zinc-400 dark:bg-zinc-900 dark:text-zinc-200 focus:dark:border-zinc-300",
              !disabled
                ? "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-transparent active:border-zinc-600 hover:dark:border-zinc-600 active:dark:border-zinc-300"
                : "focus:border-white focus:ring-0 dark:focus:border-zinc-900"
            )}
            readOnly={disabled}
          />
        </div>
        <div className="group flex h-12 w-full flex-row items-start justify-start gap-4">
          <div className="flex flex-wrap items-center justify-start gap-4">
            {site.socials?.map(
              (social: { url: string; network: SocialsType }) => {
                return (
                  <a
                    key={social.network}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                      "block resize-none border-transparent bg-white text-sm text-zinc-600 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-900 dark:text-zinc-200",
                      !disabled &&
                        "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-2 focus:ring-zinc-600 active:border-zinc-600 hover:dark:border-zinc-600 focus:dark:border-zinc-300 active:dark:border-zinc-300"
                    )}
                  >
                    {renderSocialsColorBorder(social.network)}
                  </a>
                );
              }
            )}
            {!isIsrMode && (
              <button
                className={clsx(
                  site.socials?.length !== 0 && "lg:hidden",
                  "flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded border border-zinc-200 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 group-hover:flex dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:focus:ring-zinc-300 dark:focus:ring-offset-zinc-900"
                )}
                onClick={() => setSiteSettingsOpen(!siteSettingsOpen)}
              >
                <PlusSmallIcon className="h-8 w-8" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const renderSocialsColorBorder = (social: SocialsType) => {
  switch (social) {
    case "twitter":
      return (
        <SiTwitter className="h-12 w-12 rounded border border-[#1DA1F2] bg-[#1DA1F2] bg-opacity-5 p-3 text-[#1DA1F2]" />
      );
    case "instagram":
      return (
        <SiInstagram className="h-12 w-12 rounded border border-[#E1306C] bg-[#E1306C] bg-opacity-5 p-3 text-[#E1306C]" />
      );
    case "bandcamp":
      return (
        <SiBandcamp className="h-12 w-12 rounded border border-[#629aa9] bg-[#629aa9] bg-opacity-5 p-3 text-[#629aa9]" />
      );
    case "facebook":
      return (
        <SiFacebook className="h-12 w-12 rounded border border-[#1877F2] bg-[#1877F2] bg-opacity-5 p-3 text-[#1877F2]" />
      );
    case "linkedin":
      return (
        <SiLinkedin className="h-12 w-12 rounded border border-[#0A66C2] bg-[#0A66C2] bg-opacity-5 p-3 text-[#0A66C2]" />
      );
    case "github":
      return (
        <SiGithub className="h-12 w-12 rounded border border-[#333] bg-[#333] bg-opacity-5 p-3 text-[#333] dark:border-[#eee] dark:bg-[#eee] dark:bg-opacity-5 dark:text-[#eee]" />
      );
    case "gitlab":
      return (
        <SiGitlab className="h-12 w-12 rounded border border-[#FCA326] bg-[#FCA326] bg-opacity-5 p-3 text-[#FCA326]" />
      );
    case "youtube":
      return (
        <SiYoutube className="h-12 w-12 rounded border border-[#FF0000] bg-[#FF0000] bg-opacity-5 p-3 text-[#FF0000]" />
      );
    case "twitch":
      return (
        <SiTwitch className="h-12 w-12 rounded border border-[#9146FF] bg-[#9146FF] bg-opacity-5 p-3 text-[#9146FF]" />
      );
    case "pinterest":
      return (
        <SiPinterest className="h-12 w-12 rounded border border-[#E60023] bg-[#E60023] bg-opacity-5 p-3 text-[#E60023]" />
      );
    case "tiktok":
      return (
        <SiTiktok className="h-12 w-12 rounded border border-[#000000] bg-[#000000] bg-opacity-5 p-3 text-[#000000] dark:border-[#eee] dark:bg-[#eee] dark:bg-opacity-5 dark:text-[#eee]" />
      );
    case "reddit":
      return (
        <SiReddit className="h-12 w-12 rounded border border-[#FF4500] bg-[#FF4500] bg-opacity-5 p-3 text-[#FF4500]" />
      );
    case "spotify":
      return (
        <SiSpotify className="h-12 w-12 rounded border border-[#1DB954] bg-[#1DB954] bg-opacity-5 p-3 text-[#1DB954]" />
      );
    case "soundcloud":
      return (
        <SiSoundcloud className="h-12 w-12 rounded border border-[#FF3300] bg-[#FF3300] bg-opacity-5 p-3 text-[#FF3300]" />
      );
    case "snapchat":
      return (
        <SiSnapchat className="h-12 w-12 rounded border border-[#e3e02b] bg-[#e3e02b] bg-opacity-5 p-3 text-[#e3e02b]" />
      );
    case "dribbble":
      return (
        <SiDribbble className="h-12 w-12 rounded border border-[#EA4C89] bg-[#EA4C89] bg-opacity-5 p-3 text-[#EA4C89]" />
      );
    case "behance":
      return (
        <SiBehance className="h-12 w-12 rounded border border-[#1769FF] bg-[#1769FF] bg-opacity-5 p-3 text-[#1769FF]" />
      );
    case "figma":
      return (
        <SiFigma className="h-12 w-12 rounded border border-[#333] bg-[#333] bg-opacity-5 p-3 text-[#333] dark:border-[#eee] dark:bg-[#eee] dark:bg-opacity-5 dark:text-[#eee]" />
      );
    default:
      return (
        <LinkIcon className="h-12 w-12 rounded border border-[#333] bg-[#333] bg-opacity-5 p-3 text-[#333] dark:border-[#eee] dark:bg-[#eee] dark:bg-opacity-5 dark:text-[#eee]" />
      );
  }
};
