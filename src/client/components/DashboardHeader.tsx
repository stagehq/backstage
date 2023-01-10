import { Disclosure, Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsOpenState } from "../store/ui/modals";
import { currentUserState } from "../store/user";
import { Icon } from "./Icons";

const userNavigation = [
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function DashboardHeader() {
  const user = useRecoilValue(currentUserState);
  const [, setSettingsOpen] = useRecoilState(settingsOpenState);

  if (!user) return null;

  return (
    <div className="w-full sm:w-full md:w-[750] lg:w-[1200px] px-2 sm:px-4 mx-auto">
      <Disclosure as="div" className="relative w-full">
        {({ open }) => (
          <>
            <nav
              className={clsx(
                open ? "bg-zinc-50 border-b border-zinc-200" : "bg-transparent",
                "relative z-10 border-opacity-25 w-full"
              )}
            >
              <div className="w-full">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-md">
                      <Logo />
                    </div>
                    <div className=" font-semibold text-lg text-zinc-700">
                      Stage
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <Icon name={"XMarkIcon"} color="dark" />
                      ) : (
                        <Icon name={"Bars2Icon"} color="dark" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden md:relative md:z-10 md:ml-4 md:flex  md:items-center">
                    <div className="flex justify-start items-center gap-1">
                      <a
                        href="mailto:office@getstage.app"
                        className="cursor-pointer text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 flex justify-start items-center h-8 overflow-hidden gap-2 px-4 py-2 rounded border border-zinc-200"
                      >
                        <p className="text-sm font-medium">Feedback</p>
                      </a>
                      <a
                        href="https://developers.getstage.app/introduction/readme"
                        className="cursor-pointer text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 flex justify-start items-center h-8 overflow-hidden gap-2 py-2 px-4 rounded"
                      >
                        <p className="text-sm font-medium">Docs</p>
                      </a>
                      <a
                        href="https://twitter.com/stage_hq"
                        className="cursor-pointer text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 flex justify-start items-center h-8 overflow-hidden gap-2 py-2 px-4 rounded"
                      >
                        <p className="text-sm font-medium">Community</p>
                      </a>
                    </div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="flex-shrink-0 relative ml-4">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.image ? user.image : ""}
                            referrerPolicy="no-referrer"
                            alt="profile image"
                          />
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none cursor-pointer">
                          <Menu.Item>
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
                          </Menu.Item>
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
                          alt=""
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
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
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

function Logo() {
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
