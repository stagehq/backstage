import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateSiteHeaderMutation } from "../graphql/updateSiteHeader.generated";
import { handleDynamicHeight } from "../helper/racingBuffer";
import { siteSlugState, siteState } from "../store/site";
import { themeState } from "../store/ui/theme";

export const PageHeader = () => {
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
  const [site] = useRecoilState(siteState(siteSlug));
  const [theme, setTheme] = useRecoilState(themeState);

  //set initial value
  useEffect(() => {
    if (site?.tagline) setTagline(site?.tagline);
  }, [site?.tagline]);
  useEffect(() => {
    if (site?.bio) setBio(site?.bio);
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
      if (site?.subdomain && site?.bio && site?.tagline) {
        const response = await updateSiteHeader({
          subdomain: site?.subdomain,
          bio: site.bio,
          tagline: site.tagline,
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
        }
      } else {
        console.log("Need site object for update");
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="@container flex flex-col justify-start items-start gap-[54px] pt-6">
      <div className="flex justify-end items-start self-stretch gap-2">
        <div
          className="flex justify-start items-start relative gap-2 p-2 rounded-full bg-zinc-100/40 dark:bg-zinc-800/90 ring-1 ring-zinc-900/5 backdrop-blur dark:ring-white/10 cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <SunIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start self-stretch gap-8 w-full @3xl:w-3/4 @6xl:w-1/2">
        {/* <img src={image} className="w-16 rounded-full object-cover" /> */}
        <div className="w-full flex flex-col gap-4">
          {tagline != null && (
            <textarea
              ref={taglineRef}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              onBlur={() => handleBlur()}
              id="tagline"
              placeholder="Enter tagline..."
              className="block w-full resize-none bg-white focus:bg-white dark:bg-zinc-900 py-0 px-0 font-bold text-2xl lg:text-4xl text-zinc-800 dark:text-zinc-200 placeholder-zinc-300 focus:ring-transparent border-0 border-l-2 pl-4 -ml-4 border-transparent hover:border-zinc-300 hover:dark:border-zinc-600 active:border-zinc-600 focus:border-zinc-600 active:dark:border-zinc-300 focus:dark:border-zinc-300"
            />
          )}
          {bio != null && (
            <textarea
              ref={bioRef}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onBlur={() => handleBlur()}
              id="bio"
              placeholder="Enter bio..."
              className="block w-full resize-none bg-white focus:bg-white dark:bg-zinc-900 py-0 px-0 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:ring-transparent border-0 border-l-2 pl-4 -ml-4 border-transparent hover:border-zinc-300 hover:dark:border-zinc-600 active:border-zinc-600 active:dark:border-zinc-300 focus:border-zinc-600 focus:dark:border-zinc-300"
            />
          )}
        </div>
      </div>
    </div>
  );
};
