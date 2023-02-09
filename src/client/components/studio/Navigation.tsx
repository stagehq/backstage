import {
  ArrowLeftIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  LinkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getBaseUrl } from "../../../helper/getBaseUrl";
import { siteSlugState, siteState } from "../../store/site";
import {
  analyticsOpenState,
  siteSettingsOpenState,
  storeOpenState,
} from "../../store/ui/modals";
import { AddIcon, AnalyticsIcon, CopyLinkIcon, SettingsIcon } from "../CustomIcons";

export default function Navigation() {
  const navigate = useNavigate();

  /* Site state */
  const siteSlug = useRecoilValue(siteSlugState);
  const [site] = useRecoilState(siteState(siteSlug));

  /* Settings modal state */
  const [, setSiteSettingsOpen] = useRecoilState(siteSettingsOpenState);

  /* Analytics modal state */
  const [, setAnalyticsOpen] = useRecoilState(analyticsOpenState);

  /* Store modal state */
  const [, setStoreOpen] = useRecoilState(storeOpenState);

  const handleCopyLink = () => {
    console.log("Copy link");

    if (!site || typeof navigator === "undefined")
      return console.error("No site found");

    const url = `${getBaseUrl()}/${site?.subdomain}`;
    navigator.clipboard.writeText(url).then(
      () => {
        console.log(`Copied URL to clipboard: ${url}`);
        toast.success(`Yay!! Copied URL to clipboard: ${url}`);
      },
      (error) => {
        console.error(`Failed to copy URL to clipboard: ${error}`);
      }
    );
  };

  const handleSettingsClick = () => {
    setSiteSettingsOpen(true);
  };

  const handleAnalyticsClick = () => {
    setAnalyticsOpen(true);
  };

  const handleAddBlockClick = () => {
    setStoreOpen(true);
  };

  const navigation = [
    { name: "Copy link", icon: CopyLinkIcon, action: handleCopyLink },
    { name: "Settings", icon: SettingsIcon, action: handleSettingsClick },
    { name: "Analytics", icon: AnalyticsIcon, action: handleAnalyticsClick },
    { name: "Add block", icon: AddIcon, action: handleAddBlockClick },
  ];

  return (
    <TooltipPrimitive.Provider>
      <div className="flex w-16 items-center flex-col overflow-y-auto border-r border-zinc-300 bg-white pt-5 pb-4 dark:border-zinc-600 dark:bg-zinc-900">
        <div className="flex h-full flex-col">
          <div className="px-2">
            <span
              onClick={() => navigate("/s")}
              className={clsx(
                "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-700 cursor-pointer",
                "group flex items-center justify-center m-0 rounded-md px-2 py-2 text-sm font-medium"
              )}
            >
              <ArrowLeftIcon
                className={clsx(
                  "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700",
                  "h-6 w-6 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            </span>
          </div>
          <nav
            className="flex h-full flex-col justify-center gap-4 px-2 pb-12"
            aria-label="Sidebar"
          >
            {navigation.map((item) => (
              <TooltipPrimitive.Root key={item.name}>
                <TooltipPrimitive.Trigger asChild>
                  <span
                    key={item.name}
                    onClick={() => item.action()}
                    className={clsx(
                      "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer",
                      "group flex items-center rounded-md p-1 text-sm font-medium"
                    )}
                  >
                    <item.icon aria-hidden="true" />
                    
                  </span>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                  sideOffset={4}
                  side="right"
                  className={clsx(
                    "radix-side-top:animate-slide-down-fade",
                    "radix-side-right:animate-slide-left-fade",
                    "radix-side-bottom:animate-slide-up-fade",
                    "radix-side-left:animate-slide-right-fade",
                    "inline-flex items-center rounded-md px-2.5 py-2",
                    "z-10 bg-zinc-800 font-semibold hover:text-zinc-100"
                  )}
                >
                  <span className="block text-sm leading-none text-zinc-100">
                    {item.name}
                  </span>
                </TooltipPrimitive.Content>
              </TooltipPrimitive.Root>
            ))}
          </nav>
        </div>
      </div>
    </TooltipPrimitive.Provider>
  );
}
