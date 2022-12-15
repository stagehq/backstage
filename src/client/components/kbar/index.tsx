import clsx from "clsx";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  Priority,
  useMatches,
} from "kbar";
import { signOut } from "next-auth/react";

import { FC } from "react";
import { Icon } from "../Icons";

interface CommandBarProps {
  children: React.ReactNode;
}

const RenderResults: FC = () => {
  const { results } = useMatches();

  return (
    <div className="p-2 text-sm text-gray-700">
      <KBarResults
        items={results}
        onRender={({ item, active }) => {
          if (typeof item === "string") {
            return (
              <div className="flex cursor-default select-none items-center rounded-md px-3 py-2">
                {item}
              </div>
            );
          } else {
            return (
              <div
                className={clsx(
                  "flex cursor-default select-none items-center rounded-md px-3 py-2",
                  active && "bg-gray-900 bg-opacity-5 text-gray-900"
                )}
              >
                {item.icon}
                <span className="ml-3 flex-auto truncate text">
                  {item.name}
                </span>
                <span
                  className={clsx(
                    "ml-3 flex-none text-xs font-semibold text-gray-900 text-opacity-40",
                    active && "text-opacity-100"
                  )}
                >
                  {item.shortcut &&
                    item.shortcut.map((shortcut) => (
                      <kbd className="font-sans">{shortcut}</kbd>
                    ))}
                </span>
              </div>
            );
          }
        }}
      />
    </div>
  );
};

const CommandBar: FC<CommandBarProps> = ({ children }) => {
  // initial action for kbar
  const actions = [
    {
      id: "signout",
      name: "Sign out",
      priority: Priority.LOW,
      icon: <Icon name="ArrowLeftOnRectangleIcon" size="md" color="neutral" />,
      perform: () => {
        signOut({
          callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
        });
      },
    },
  ];

  return (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}
    >
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity">
          <KBarAnimator>
            <div className="mx-auto max-w-2xl w-96 transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <div className="relative">
                <Icon name="MagnifyingGlassIcon" size="md" color="dark" />
                <KBarSearch
                  defaultPlaceholder="Search..."
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm outline-none"
                />
              </div>
              <div className="max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto">
                <RenderResults />
              </div>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default CommandBar;