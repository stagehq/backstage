import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { settingsOpenState } from "../store/ui/modals";
import { currentUserState } from "../store/user";
import Breadcrumb from "./Breadcrumb";
import Tabs from "./Tabs";

export const Header = () => {

  const [currentUser] = useRecoilState(currentUserState);
  const [, setSettingsOpen] = useRecoilState(settingsOpenState);

  if (!currentUser) return null;

  return (
    <div className="h-screen overflow-hidden">
      <Disclosure
        as="header"
        className="bg-transparent border-r border-gray-200"
      >
        {({ open }) => (
          <>
            <div className="flex items-center justify-between h-[60px] w-full px-2 sm:px-4 lg:px-6">
              <Breadcrumb />
              <div className="relative z-10 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden md:relative md:z-10 md:ml-4 md:flex  md:items-center">
                <div className="flex justify-start items-center gap-1">
                  <a href="" className="cursor-pointer text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 flex justify-start items-center h-8 overflow-hidden gap-2 px-4 py-2 rounded border border-zinc-200">
                    <p className="text-sm font-medium">
                      Feedback
                    </p>
                  </a>
                  <a href="https://developers.getstage.app/introduction/readme" className="cursor-pointer text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 flex justify-start items-center h-8 overflow-hidden gap-2 py-2 px-4 rounded">
                    <p className="text-sm font-medium">Docs</p>
                  </a>
                  <a href="" className="cursor-pointer text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 flex justify-start items-center h-8 overflow-hidden gap-2 py-2 px-4 rounded">
                    <p className="text-sm font-medium">
                      Community
                    </p>
                  </a>
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="flex-shrink-0 relative ml-4">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser.image ? currentUser.image : ""}
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
                            to={`/s/profile/${currentUser.alias}`}
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

            <Disclosure.Panel
              as="nav"
              className="lg:hidden"
              aria-label="Global"
            >
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="px-2 sm:px-4 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={currentUser.image ? currentUser.image : ""}
                      referrerPolicy="no-referrer"
                      alt="profile image"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-800">
                      {currentUser?.firstName && currentUser?.lastName
                        ? currentUser.firstName + " " + currentUser?.lastName
                        : currentUser.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {currentUser.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-1 sm:px-3 space-y-1">
                  <Link to={`/s/profile/${currentUser && currentUser.alias}`}>
                    <Disclosure.Button className="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                      Your profile
                    </Disclosure.Button>
                  </Link>
                  <Disclosure.Button
                    as="a"
                    onClick={() => setSettingsOpen(true)}
                    className="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    onClick={() =>
                      signOut({
                        callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
                      })
                    }
                    className="block rounded-md py-2 px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Tabs />
      <Outlet />
    </div>
  );
};
