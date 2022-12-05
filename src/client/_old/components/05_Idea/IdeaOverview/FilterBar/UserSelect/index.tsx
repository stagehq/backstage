import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  projectSlugState,
  projectState,
} from "../../../../../../store/project";

import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import { User } from "../../../../../../graphql/types.generated";
import { userSelectState } from "../../../../../../store/ui/ideasFilter";

const UserSelect: FC = () => {
  /* data */
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [people, setPeople] = useState<User[] | null>(null);

  /* ui states */
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useRecoilState(userSelectState);

  const filteredPeople =
    people !== null
      ? query === ""
        ? people
        : people.filter((person) => {
            return person.name!.toLowerCase().includes(query.toLowerCase());
          })
      : people;

  useEffect(() => {
    if (project && project.contributors) {
      setPeople(project.contributors.map((contributor) => contributor.user!));
    }
  }, [project]);

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative">
        <Combobox.Input
          className="w-36 h-10 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => {
            setQuery(event.target.value);
            if (event.target.value === "") {
              setSelectedPerson(null);
            }
          }}
          displayValue={(person: any) => person?.name}
          placeholder="Every user"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        src={person.image ? person.image : ""}
                        referrerPolicy="no-referrer"
                        alt="profile image"
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={clsx(
                          "ml-3 truncate",
                          selected ? "font-semibold" : ""
                        )}
                      >
                        {person.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default UserSelect;
