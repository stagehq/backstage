import { Disclosure, Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { generateGradient } from "../../helper/generateUserGradient";
import { settingsOpenState } from "../store/ui/modals";
import { currentUserState } from "../store/user";
import { Icon } from "./Icons";

export default function DashboardHeader() {
  const user = useRecoilValue(currentUserState);
  const [, setSettingsOpen] = useRecoilState(settingsOpenState);

  if (!user) return null;

  const gradient = generateGradient(user?.firstName ? user.firstName : "Horst");

  return (
    <div className="mx-auto w-full px-2 sm:w-full sm:px-4 md:w-[750] lg:w-[1200px]">
      <Disclosure as="div" className="relative w-full">
        {({ open }) => (
          <>
            <nav
              className={clsx(
                open ? "border-b border-zinc-200 bg-zinc-50" : "bg-transparent",
                "relative z-10 w-full border-opacity-25"
              )}
            >
              <div className="w-full">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                      <Logo />
                    </div>
                    <div className=" text-lg font-semibold text-zinc-700">
                      Stage
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-800">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <Icon name={"XMarkIcon"} color="dark" />
                      ) : (
                        <Icon name={"Bars2Icon"} color="dark" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden md:relative md:z-10 md:ml-4 md:flex  md:items-center">
                    <div className="flex items-center justify-start gap-1">
                      <a
                        href="https://discord.gg/PDBGggcTyW"
                        className="flex h-8 cursor-pointer items-center justify-start gap-2 overflow-hidden rounded border border-zinc-200 px-4 py-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800"
                      >
                        <p className="text-sm font-medium">Feedback</p>
                      </a>
                      <a
                        href="https://developers.getstage.app/introduction/readme"
                        target={"_blank"}
                        rel={"noopener"}
                        className="flex h-8 cursor-pointer items-center justify-start gap-2 overflow-hidden rounded border border-transparent py-2 px-4 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800"
                      >
                        <p className="text-sm font-medium">Docs</p>
                      </a>
                      <a
                        href="https://discord.gg/PDBGggcTyW"
                        target={"_blank"}
                        rel={"noopener"}
                        className="flex h-8 cursor-pointer items-center justify-start gap-2 overflow-hidden rounded border border-transparent py-2 px-4 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800"
                      >
                        <p className="text-sm font-medium">Community</p>
                      </a>
                    </div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          {user.image ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.image ? user.image : ""}
                              referrerPolicy="no-referrer"
                              alt="profile image"
                            />
                          ) : (
                            <div
                              className="h-8 w-8 rounded-full"
                              style={{ background: gradient }}
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right cursor-pointer rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {/* <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/s/profile/${user.alias}`}
                                className={clsx(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => setSettingsOpen(true)}
                                className={clsx(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() =>
                                  signOut({
                                    callbackUrl:
                                      process.env.NEXT_PUBLIC_NEXTAUTH_URL,
                                  })
                                }
                                className={clsx(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="pt-4 pb-3">
                  <div className="flex items-center px-4">
                    {user.image && (
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.image}
                          alt="profile image"
                        />
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-base font-medium text-zinc-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-zinc-600">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2">
                    {/* <Link
                      to={`/s/profile/${user.alias}`}>
                      <Disclosure.Button
                        className="block rounded-md py-2 px-3 text-base font-medium text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                      >
                        Your Profile
                      </Disclosure.Button>
                    </Link> */}
                    <Disclosure.Button
                      as="div"
                      onClick={() => setSettingsOpen(true)}
                      className="block rounded-md py-2 px-3 text-base font-medium text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                    >
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="div"
                      onClick={() =>
                        signOut({
                          callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
                        })
                      }
                      className="block rounded-md py-2 px-3 text-base font-medium text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </nav>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 96 96"
    >
      <path
        fill="#18181B"
        d="M0 0H96V96H0z"
        transform="matrix(-1 0 0 1 96 0)"
      ></path>
      <path
        fill="url(#paint0_radial_617_54589)"
        d="M76 71L48 19 20 71h56z"
      ></path>
      <path
        fill="url(#paint1_radial_617_54589)"
        d="M76 71L48 19 20 71h56z"
      ></path>
      <ellipse
        fill="#D4D4D8"
        rx="28"
        ry="6"
        transform="matrix(-1 0 0 1 48 71)"
      ></ellipse>
      <defs>
        <radialGradient
          id="paint0_radial_617_54589"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -51 54.9231 0 48 71)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E4E7" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#E4E4E7"></stop>
        </radialGradient>
        <radialGradient
          id="paint1_radial_617_54589"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -52 56 0 48 71)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.625" stopColor="#E4E4E7" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#E4E4E7"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}
