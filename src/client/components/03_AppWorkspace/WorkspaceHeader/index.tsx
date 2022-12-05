"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowSmRightIcon,
  GlobeIcon,
  InboxIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { FC, Fragment } from "react";
import {
  projectCreateOpenState,
  settingsOpenState,
} from "../../../store/ui/modals";

import clsx from "clsx";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { projectSlugState } from "../../../store/project";
import { currentUserState } from "../../../store/user";
import Breadcrumb from "../Breadcrumb";
import PlusButton from "../PlusButton";
import Search from "../Search";
import { navigation } from "../SidebarNavigation";
import WorkspaceSelector from "../WorkspaceSelector";

const WorkspaceHeader: FC = () => {
  /* data */
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [projectSlug, setProjectSlug] = useRecoilState(projectSlugState);

  /* state */
  const [settingsOpen, setSettingsOpen] = useRecoilState(settingsOpenState);
  const [projectCreateOpen, setProjectCreateOpen] = useRecoilState(
    projectCreateOpenState
  );

  /* location */
  const location = usePathname();

  return (
    <Disclosure as="header" className="bg-transparent border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 lg:px-0 hidden md:flex">
                <Breadcrumb />
              </div>
              <div className="relative z-10 flex-1 px-2 flex items-center justify-center xl:inset-0 gap-3">
                <div className="w-full md:max-w-xs">
                  <Search />
                </div>
                <PlusButton {...{ setProjectCreateOpen }} />
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
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
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <div className="flex gap-2">
                  <Link href="/discover">
                    <button
                      type="button"
                      className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <GlobeIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </Link>
                  {/* <button
                    type="button"
                    className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <InboxIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="flex-shrink-0 relative ml-4">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser?.image ? currentUser.image : ""}
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
                            href={`/profile/${
                              currentUser && currentUser.alias
                            }`}
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

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="border-t border-gray-200 py-4 w-full">
              <div className="flex items-center w-full px-2">
                <WorkspaceSelector />
              </div>
            </div>
            <div className="pt-2 pb-3 px-2 space-y-1">
              {projectSlug &&
                navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={"/workspace/" + projectSlug + item.href}
                  >
                    <Disclosure.Button
                      key={item.name}
                      className={clsx(
                        location?.endsWith(item.key || projectSlug)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "block rounded-md py-2 px-3 text-base font-medium w-full text-left"
                      )}
                      aria-current={
                        location?.endsWith(item.key || projectSlug)
                          ? "page"
                          : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
            </div>
            <div className="border-t border-gray-200 py-4">
              <div className="px-4 flex items-center">
                <Link href="/discover">
                  <span className="flex items-center gap-2 w-full">
                    <button
                      type="button"
                      className="w-full flex justify-between flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <div className="flex items-center gap-3">
                        <GlobeIcon
                          className="h-6 w-6 stroke-cyan-500"
                          aria-hidden="true"
                        />
                        <div className="text-cyan-500 font-medium">
                          Discover the community!
                        </div>
                      </div>
                      <ArrowSmRightIcon
                        className="h-6 w-6 stroke-cyan-500"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="px-4 flex justify-between items-center">
                <div className="flex gap-1">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={currentUser?.image ? currentUser.image : ""}
                      referrerPolicy="no-referrer"
                      alt="profile image"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {currentUser?.fullName}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {currentUser?.email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <InboxIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link href={`/profile/${currentUser && currentUser.alias}`}>
                  <Disclosure.Button className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    Your profile
                  </Disclosure.Button>
                </Link>
                <Disclosure.Button
                  as="a"
                  onClick={() => setSettingsOpen(true)}
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default WorkspaceHeader;
