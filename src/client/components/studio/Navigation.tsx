import { Popover, Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { Fragment } from "react";
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
import {
  AddIcon,
  CopyLinkIcon,
  FeedbackIcon,
  SettingsIcon,
} from "../CustomIcons";

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
    // console.log("Copy link");

    if (!site || typeof navigator === "undefined") return; // console.error("No site found");

    const url = `${getBaseUrl()}/${site?.subdomain}`;
    navigator.clipboard.writeText(url).then(
      () => {
        // console.log(`Copied URL to clipboard: ${url}`);
        toast.success(`Yay!! Copied URL to clipboard: ${url}`);
      },
      (error) => {
        // console.error(`Failed to copy URL to clipboard: ${error}`);
      }
    );
  };

  const handleSettingsClick = () => {
    setSiteSettingsOpen(true);
  };

  const handleFeedbackClick = () => {
    window.location.href = "https://discord.gg/PDBGggcTyW";
  };

  const handleAddBlockClick = () => {
    setStoreOpen(true);
  };

  const navigation = [
    { name: "Copy link", icon: CopyLinkIcon, action: handleCopyLink },
    { name: "Settings", icon: SettingsIcon, action: handleSettingsClick },
    { name: "Feedback", icon: FeedbackIcon, action: handleFeedbackClick },
    { name: "Add block", icon: AddIcon, action: handleAddBlockClick },
  ];

  return (
    <>
      <div className="absolute top-3 left-4 z-10 block sm:hidden">
        <button
          onClick={() => navigate("/s")}
          aria-label={"Back to all sites"}
          className={clsx(
            "cursor-pointer text-zinc-600 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-700",
            "group m-0 flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-300"
          )}
        >
          <ArrowLeftIcon
            className={clsx(
              "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700",
              "h-6 w-6 flex-shrink-0"
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="absolute top-3 right-4 z-10 block sm:hidden">
        <div className="w-full">
          <div className="relative z-10 flex items-center md:hidden">
            {/* Mobile menu button */}
          </div>

          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="group m-0 flex cursor-pointer items-center justify-center rounded-md px-2 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus:ring-zinc-300">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon
                      className={clsx(
                        "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700",
                        "h-6 w-6 flex-shrink-0"
                      )}
                    />
                  ) : (
                    <Bars2Icon
                      className={clsx(
                        "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700",
                        "h-6 w-6 flex-shrink-0"
                      )}
                    />
                  )}
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    as="div"
                    className="absolute right-0 z-10 mt-5 w-screen max-w-min rounded bg-white shadow-lg dark:bg-zinc-800 dark:shadow-none"
                  >
                    {navigation.map(
                      (item) =>
                        item.name !== "Add block" && (
                          <Popover.Button
                            as="div"
                            key={item.name}
                            onClick={item.action}
                            className="block rounded-md py-2 px-3 text-base font-medium text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                          >
                            {item.name}
                          </Popover.Button>
                        )
                    )}
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
      <div className="absolute bottom-12 right-12 z-10 block sm:hidden">
        {navigation.map(
          (item) =>
            item.name === "Add block" && (
              <button
                key={item.name}
                aria-label={item.name}
                onClick={() => item.action()}
                className={clsx(
                  "cursor-pointer shadow-lg dark:text-zinc-300 dark:shadow-none dark:hover:bg-zinc-700",
                  "group flex items-center rounded-md p-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-300",
                  item.name === "Add block"
                    ? "border border-zinc-200 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-300 dark:focus:ring-offset-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100"
                )}
              >
                <item.icon aria-hidden="true" />
              </button>
            )
        )}
      </div>
      <div className="hidden sm:flex">
        <TooltipPrimitive.Provider>
          <div className="flex w-16 flex-col items-center overflow-y-auto border-r border-zinc-300 bg-white pt-5 pb-4 dark:border-zinc-600 dark:bg-zinc-900">
            <div className="flex h-full flex-col">
              <div className="px-2">
                <button
                  onClick={() => navigate("/s")}
                  aria-label={"Back to all sites"}
                  className={clsx(
                    "cursor-pointer text-zinc-600 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-700",
                    "group m-0 flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-300"
                  )}
                >
                  <ArrowLeftIcon
                    className={clsx(
                      "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700",
                      "h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </div>
              <nav
                className="flex h-full flex-col justify-center gap-4 px-2 pb-12"
                aria-label="Sidebar"
              >
                {navigation.map((item) => (
                  <TooltipPrimitive.Root key={item.name}>
                    <TooltipPrimitive.Trigger asChild>
                      <button
                        key={item.name}
                        aria-label={item.name}
                        onClick={() => item.action()}
                        className={clsx(
                          "cursor-pointer dark:text-zinc-300 dark:hover:bg-zinc-700",
                          "group flex items-center rounded-md p-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-300",
                          item.name === "Add block"
                            ? "border border-zinc-200 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-300 dark:focus:ring-offset-zinc-900"
                            : "text-zinc-600 hover:bg-zinc-100"
                        )}
                      >
                        <item.icon aria-hidden="true" />
                      </button>
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
      </div>
    </>
  );
}
