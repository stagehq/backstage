import { LinkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import {
  Behance,
  Dribbble,
  Facebook,
  Github,
  Gitlab,
  Instagram,
  Linkedin,
  Pinterest,
  Reddit,
  Soundcloud,
  Spotify,
  Tiktok,
  Twitch,
  Twitter,
  Youtube,
} from "@icons-pack/react-simple-icons";
import { decodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateSiteHeaderMutation } from "../graphql/updateSiteHeader.generated";
import { handleDynamicHeight } from "../helper/racingBuffer";
import { siteSlugState, siteState } from "../store/site";
import { themeState } from "../store/ui/theme";
import { currentUserState } from "../store/user";
import ImageUpload from "./crop/ImageUpload";
import { SocialsType } from "./modals/sitesettings/Socials";

interface PageHeaderProps {
  disabled: boolean;
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
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [theme, setTheme] = useRecoilState(themeState);
  const [user, setUser] = useRecoilState(currentUserState);

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
          console.log(
            "We're sorry! Something went wrong while updating the header."
          );
          toast.error(
            "We're sorry! Something went wrong while updating the header."
          );
        } else {
          console.log(response);
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
        console.log("Need site object for update");
        toast.error("Something went wrong!");
      }
    }
  };

  const renderSocials = (social: string) => {
    switch (social) {
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "github":
        return <Github className="h-4 w-4" />;
      case "gitlab":
        return <Gitlab className="h-4 w-4" />;
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "twitch":
        return <Twitch className="h-4 w-4" />;
      case "pinterest":
        return <Pinterest className="h-4 w-4" />;
      case "tiktok":
        return <Tiktok className="h-4 w-4" />;
      case "reddit":
        return <Reddit className="h-4 w-4" />;
      case "spotify":
        return <Spotify className="h-4 w-4" />;
      case "soundcloud":
        return <Soundcloud className="h-4 w-4" />;
      case "dribbble":
        return <Dribbble className="h-4 w-4" />;
      case "behance":
        return <Behance className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  };

  console.log(site?.socials);

  if (!site) return null;

  return (
    <div className="flex flex-col items-start justify-start gap-[54px] pt-6 @container">
      <div className="flex items-start justify-end gap-2 self-stretch">
        <button
          className="relative flex cursor-pointer items-start justify-start gap-2 rounded-full bg-zinc-100/40 p-2 ring-1 ring-zinc-900/5 backdrop-blur focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-800/90 dark:ring-white/10 dark:focus:ring-zinc-300"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <SunIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-400" />
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
              !disabled &&
                "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-transparent active:border-zinc-600 hover:dark:border-zinc-600   focus:dark:border-zinc-300 active:dark:border-zinc-300"
            )}
            disabled={disabled}
          />
          <textarea
            ref={bioRef}
            value={bio ? bio : ""}
            onChange={(e) => setBio(e.target.value)}
            onBlur={() => handleBlur()}
            id="bio"
            placeholder="Enter bio..."
            className={clsx(
              "-ml-4 block w-full resize-none border-0 border-l-2 border-transparent bg-white py-0 px-0 pl-4 text-sm text-zinc-800 placeholder-zinc-400   dark:bg-zinc-900 dark:text-zinc-200 focus:dark:border-zinc-300 ",
              !disabled &&
                "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-transparent active:border-zinc-600 hover:dark:border-zinc-600 active:dark:border-zinc-300"
            )}
            disabled={disabled}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="flex items-center justify-start gap-4">
            {site.socials?.map(
              (social: { url: string; network: SocialsType }) => {
                return (
                  <a
                    key={social.network}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                      "block w-full resize-none border-transparent bg-white text-sm text-zinc-600 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-900 dark:text-zinc-200",
                      !disabled &&
                        "hover:border-zinc-300 focus:border-zinc-600 focus:bg-white focus:ring-2 focus:ring-zinc-600 active:border-zinc-600 hover:dark:border-zinc-600 focus:dark:border-zinc-300 active:dark:border-zinc-300"
                    )}
                  >
                    {renderSocials(social.network)}
                  </a>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
