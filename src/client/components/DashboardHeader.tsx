import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Jobs', href: '#', current: false },
  { name: 'Applicants', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
]
const userNavigation = [
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function DashboardHeader() {

  return (
    <div className="w-full px-4">
      <Disclosure as="div" className="relative w-full">
        {({ open }) => (
          <>
            <nav
              className={clsx(
                open ? 'bg-zinc-50 border-b border-zinc-200' : 'bg-transparent',
                'relative z-10 border-opacity-25 w-full'
              )}
            >
              <div className="w-full">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-md">
                     <Icon />
                    </div>
                    <div className=" font-semibold text-lg text-zinc-700">Stage</div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-900">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:ml-4 lg:block">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center h-8 text-zinc-600 border border-zinc-400 text-sm rounded px-3 cursor-pointer hover:bg-zinc-200 hover:text-zinc-900">
                        Feedback
                      </div>
                      <div className="flex items-center h-8 text-zinc-600 text-sm rounded px-3 cursor-pointer hover:bg-zinc-200 hover:text-zinc-900">
                        Docs
                      </div>
                      <div className="flex items-center h-8 text-zinc-600 text-sm rounded px-3 cursor-pointer hover:bg-zinc-200 hover:text-zinc-900">
                        Community
                      </div>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full text-sm text-white focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={clsx(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-zinc-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-zinc-800">{user.name}</div>
                      <div className="text-sm font-medium text-zinc-600">{user.email}</div>
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
  )
}

function Icon() {
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