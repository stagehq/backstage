import { Bars2Icon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import debounce from "lodash.debounce";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateSiteSocialsMutation } from "../../../graphql/updateSiteSocials.generated";
import { siteSlugState, siteState } from "../../../store/site";
import { SocialsDnDContext } from "../../dnd/socials/SocialsDnDContext";

interface Link {
  network: string;
  url: string;
}

export enum SocialsType {
  Facebook = "facebook",
  Twitter = "twitter",
  Instagram = "instagram",
  LinkedIn = "linkedin",
  YouTube = "youtube",
  Twitch = "twitch",
  GitHub = "github",
  GitLab = "gitlab",
  Reddit = "reddit",
  Snapchat = "snapchat",
  TikTok = "tiktok",
  Pinterest = "pinterest",
  Spotify = "spotify",
  SoundCloud = "soundcloud",
  Bandcamp = "bandcamp",
  Discord = "discord",
  Dribbble = "dribbble",
  Behance = "behance",
  Figma = "figma",
}

const Socials: FC = () => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [, updateSiteSocials] = useUpdateSiteSocialsMutation();

  const debounceUpdateSiteSocials = useCallback(
    debounce((siteSlug, links) => {
      if (siteSlug && links.length > 0) {
        updateSiteSocials({ id: siteSlug, socials: JSON.stringify(links) });
      }
    }, 1000),
    [] // will be created only once initially
  );

  useEffect(() => {
    if (site?.socials) {
      debounceUpdateSiteSocials(siteSlug, site?.socials);
      setSelectedValues(site?.socials.map((s: Link) => s.network));
    }
  }, [site?.socials]);

  if (!site) return null;

  const handleAddLink = () => {
    setSite({
      ...site,
      socials: site.socials
        ? [...site?.socials, { network: "", url: "" }]
        : [{ network: "", url: "" }],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setSite({
      ...site,
      socials: site?.socials.map((link: Link, i: number) => {
        if (i === index) {
          return { ...link, url: value };
        }
        return link;
      }),
    });
  };

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    // console.log(e.target.value, index);

    const selectedNetwork = e.target.value;
    setSite({
      ...site,
      socials: site?.socials.map((link: Link, i: number) => {
        if (i === index) {
          return { ...link, network: selectedNetwork };
        }
        return link;
      }),
    });
  };

  const handleRemoveLink = (index: number) => {
    setSite({
      ...site,
      socials: site?.socials.filter((_: Link, i: number) => i !== index),
    });
    setSelectedValues((prevValues) => prevValues.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(site?.socials);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSite({
      ...site,
      socials: items,
    });
  };

  const isStringHttpsUrl = (url: string) => {
    try {
      const u = new URL(url);
      return u.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white px-6 pt-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="delete-site"
              className="block text-sm font-medium text-gray-900"
            >
              Social links
            </label>
            <div className="mt-2 max-w-xl text-sm text-zinc-500">
              <p>
                If you add your social links here, they will display right under
                your bio.
              </p>
            </div>
            <div className="flex flex-col">
              <SocialsDnDContext onDragEnd={handleDragEnd}>
                {site.socials &&
                  site.socials.map((link: Link, index: number) => (
                    <Draggable
                      key={link.network}
                      draggableId={link.network}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            marginTop: "8px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              key={index}
                              className="relative flex w-full rounded-md"
                            >
                              <div className="absolute inset-y-0 left-0 flex items-center">
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country"
                                  className="h-full w-[120px] rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                                  value={
                                    selectedValues ? selectedValues[index] : ""
                                  }
                                  onChange={(e) => {
                                    setSelectedValues((prevValues) => {
                                      const newValues = [...prevValues];
                                      newValues[index] = e.target.value;
                                      return newValues;
                                    });
                                    handleSelect(e, index);
                                  }}
                                >
                                  <option value="">Select</option>
                                  {(
                                    Object.keys(SocialsType) as Array<
                                      keyof typeof SocialsType
                                    >
                                  )
                                    .filter(
                                      (network) =>
                                        !site.socials.some(
                                          (l: Link, i: number) =>
                                            l.network ===
                                              network.toLowerCase() &&
                                            i !== index
                                        )
                                    )
                                    .map((social) => (
                                      <option
                                        key={SocialsType[social]}
                                        value={SocialsType[social]}
                                      >
                                        {social}
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <input
                                type="text"
                                name="link"
                                id="link"
                                value={link.url}
                                onChange={(e) => handleChange(e, index)}
                                className={clsx(
                                  "block w-full rounded-md border-gray-300 pl-32 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm",
                                  link.url.length > 0 &&
                                    !isStringHttpsUrl(link.url) &&
                                    "border-red-300"
                                )}
                                placeholder="https://link.com"
                              />
                              <button
                                className="ml-2 inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-3 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                                onClick={() => handleRemoveLink(index)}
                              >
                                <TrashIcon
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            <Bars2Icon className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </SocialsDnDContext>
              <div className="my-2">
                <button
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-zinc-900 px-4 py-2 text-base font-medium text-zinc-100 shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 sm:w-auto sm:text-sm"
                  onClick={handleAddLink}
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socials;
