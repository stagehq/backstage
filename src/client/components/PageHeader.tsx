import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateSiteHeaderMutation } from "../graphql/updateSiteHeader.generated";
import { siteSlugState, siteState } from "../store/site";

export interface PageHeaderProps {
  title: string;
  description: string;
  image: string;
  lightMode: boolean;
  toggleLightMode: () => void;
}

export const PageHeader = ({
  title,
  description,
  image,
  lightMode,
  toggleLightMode,
}: PageHeaderProps) => {
  //refs
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const tagLineRef = useRef<HTMLTextAreaElement>(null);

  //local state
  const [bio, setBio] = useState<string>("");
  const [tagLine, setTagLine] = useState<string>("");

  //fetches
  const [, updateSiteHeader] = useUpdateSiteHeaderMutation();

  //state
  const siteSlug = useRecoilValue(siteSlugState);
  const [site] = useRecoilState(siteState(siteSlug));

  useEffect(() => {
    if (bioRef.current?.style) {
      bioRef.current.style.height = "0px";
      const scrollHeight = bioRef.current.scrollHeight;
      bioRef.current.style.height = scrollHeight + "px";
    }
  }, [bio]);

  useEffect(() => {
    if (tagLineRef.current?.style) {
      console.log(tagLineRef.current.scrollHeight);
      tagLineRef.current.style.height = "0px";
      const scrollHeight = tagLineRef.current.scrollHeight;
      tagLineRef.current.style.height = scrollHeight + "px";
    }
  }, [tagLine]);

  useEffect(() => {
    if(document.readyState === "complete"){
      setBio(description);
      setTagLine(title);
    }

  }, [description, title, tagLineRef, bioRef]);

  const handleBlur = async () => {
    if (bio !== description || tagLine != description) {
      if (site?.subdomain) {
        const response = await updateSiteHeader({
          subdomain: site?.subdomain,
          bio: bio,
          tagLine: tagLine,
        });
        if (!response.data?.updateSiteHeader) {
          console.log("Couldn't update Header");
          toast.error("Couldn't update Header");
        }else{
          console.log(response);
        }
      } else {
        console.log("Need site object for update");
        toast.error("It went something wrong");
      }
    }
  };

  return (
    <div className="@container flex flex-col justify-start items-start gap-[54px] pt-6">
      <div className="flex justify-end items-start self-stretch gap-2">
        <div
          className="flex justify-start items-start relative gap-2 p-2 rounded-full bg-zinc-100/40 dark:bg-zinc-800/90 ring-1 ring-zinc-900/5 backdrop-blur dark:ring-white/10 cursor-pointer"
          onClick={toggleLightMode}
        >
          {lightMode ? (
            <SunIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start self-stretch gap-8 w-full @3xl:w-3/4 @6xl:w-1/2">
        <img src={image} className="w-16 rounded-full object-cover" />
        <div className="w-full flex flex-col gap-4">
          <textarea
            ref={tagLineRef}
            name="title"
            id="title"
            className="block w-full resize-none bg-white focus:bg-white dark:bg-zinc-900 py-0 px-0 font-bold text-2xl lg:text-4xl text-zinc-800 dark:text-zinc-200 placeholder-zinc-300 focus:ring-transparent border-0 border-l-2 pl-4 -ml-4 border-transparent hover:border-zinc-300 active:border-zinc-600 focus:border-zinc-600"
            placeholder="Enter tagline..."
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            onBlur={() => handleBlur()}
          />
          <textarea
            ref={bioRef}
            name="title"
            id="title"
            className="block w-full resize-none bg-white focus:bg-white dark:bg-zinc-900 py-0 px-0 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-300 focus:ring-transparent border-0 border-l-2 pl-4 -ml-4 border-transparent hover:border-zinc-300 active:border-zinc-600 focus:border-zinc-600"
            placeholder="Enter bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            onBlur={() => handleBlur()}
          />
        </div>
      </div>
    </div>
  );
};
