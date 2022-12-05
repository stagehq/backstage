import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";

const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: true },
  { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Plan & Billing", href: "#", icon: CreditCardIcon, current: false },
  { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];

export default function SettingSidebar() {
  return (
    <aside className="lg:pt-12 py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav className="space-y-1">
        {subNavigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={clsx(
              item.current
                ? "bg-gray-50 text-indigo-600 hover:bg-white"
                : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
              "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            <item.icon
              className={clsx(
                item.current
                  ? "text-indigo-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
