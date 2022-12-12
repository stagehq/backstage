import { Popover, Transition } from "@headlessui/react";

import Link from "next/link";
import { Fragment } from "react";
import { Icon } from "../../../../components/Icons";

const navigation = [
  { name: "Twitter", href: "https://twitter.com/zirkular_os" },
  { name: "Manifesto", href: "/manifesto" },
  // { name: "Blog", href: "/blog" },
];

export default function NavbarStandard() {
  const environment = process.env.NODE_ENV;
  return (
    <div className="absolute z-50 w-full">
      {/* <Link href={isAuthenticated ? `/app` : `/`}>SaaS</Link>
    {isAuthenticated && <Link href="/api/auth/logout">Logout</Link>} */}
      <Popover as="header" className="relative">
        <div className="transparent py-6">
          <nav
            className="relative max-w-6xl mx-auto flex items-center justify-between pr-5 pl-5 md:px-8"
            aria-label="Global"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-between w-full md:w-auto">
                <span className="sr-only">Workflow</span>
                <Link href="/">
                  <img
                    className="h-8 w-auto md:h-10 cursor-pointer"
                    src="/images/logo.svg"
                    alt="Zirkular Logo"
                  />
                </Link>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-black focus:outline-none focus:ring-2 focus-ring-inset focus:ring-indigo">
                    <span className="sr-only">Open main menu</span>
                    <Icon name={"Bars2Icon"} color="dark" />
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden space-x-8 md:flex md:ml-10">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-black hover:text-indigo-600"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {environment !== "production" && (
                <div className="hidden md:flex md:items-center md:space-x-6">
                  <Link href="/auth/login">
                    <a className="text-base font-medium text-black hover:text-indigo-600">
                      Log in
                    </a>
                  </Link>
                  <Link href="/get-started">
                    <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Start free trial
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <Transition as={Fragment}>
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 md:hidden"
          >
            <div className="shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div className="pt-2">
                  <Link href="/">
                    <img
                      className="h-8 w-auto md:h-10 cursor-pointer"
                      src="/images/logo.svg"
                      alt="Zirkular Logo"
                    />
                  </Link>
                </div>
                <div className="-mr-2 pt-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo">
                    <span className="sr-only">Close menu</span>
                    <Icon name={"XMarkIcon"} color="dark" />
                  </Popover.Button>
                </div>
              </div>
              <div className="pt-5 pb-6">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {environment !== "production" && (
                  <div>
                    <div className="mt-6 px-5">
                      <a
                        href="#"
                        className="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-500"
                      >
                        Apply for private beta
                      </a>
                    </div>
                    <div className="mt-6 px-5">
                      <p className="text-center text-base font-medium text-gray-500">
                        Existing customer?{" "}
                        <a href="#" className="text-gray-900 hover:underline">
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
