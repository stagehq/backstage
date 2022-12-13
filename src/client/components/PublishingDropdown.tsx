import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC, Fragment, useState } from "react";

type publishingKeys = "offline" | "unlisted" | "published";

type publishingOption = {
  key: publishingKeys;
  title: string;
  description: string;
};

const publishingOptions: publishingOption[] = [
  {
    key: "published",
    title: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
  },
  {
    key: "unlisted",
    title: "Unlisted",
    description: "This job posting will no longer be publicly accessible.",
  },
  {
    key: "offline",
    title: "Offline",
    description: "This job posting will no longer be publicly accessible.",
  },
];

interface PublishingDropdownProps {
  state: publishingKeys;
}

const PublishingDropdown: FC<PublishingDropdownProps> = ({ state }) => {
  const [selected, setSelected] = useState<publishingOption>(
    publishingOptions.find((option) => option.key === state) as publishingOption
  );

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            {" "}
            Change published status{" "}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="h-8 flex gap-2 pl-3 pr-2 items-center rounded-2xl p-2 border border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
              <span className="sr-only">Change published status</span>
              <div
                className={clsx(
                  "mr-1 w-2.5 h-2.5 rounded-md",
                  selected.title === "Published"
                    ? "bg-emerald-400"
                    : selected.title === "Unlisted"
                    ? "bg-transparent border-2 border-emerald-400"
                    : "bg-rose-500 border-transparent"
                )}
              ></div>
              <p className="text-sm font-medium">{selected.title}</p>
              <ChevronDownIcon
                className="h-5 w-5 text-zinc-700"
                aria-hidden="true"
              />
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {publishingOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      clsx(
                        active ? "text-zinc-700 bg-zinc-100" : "text-zinc-900",
                        "cursor-default select-none p-4 text-sm"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-zinc-700" : "text-zinc-700"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={clsx(
                            active ? "text-zinc-500" : "text-zinc-400",
                            "mt-2"
                          )}
                        >
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default PublishingDropdown;
