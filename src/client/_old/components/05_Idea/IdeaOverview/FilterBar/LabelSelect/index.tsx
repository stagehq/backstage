import { Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Label } from "../../../../../../graphql/types.generated";
import {
  projectSlugState,
  projectState,
} from "../../../../../../store/project";
import { labelSelectState } from "../../../../../../store/ui/ideasFilter";

const LabelSelect: FC = () => {
  /* data */
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [labels, setLabels] = useState<Label[] | null>(null);

  /* ui states */
  const [query, setQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useRecoilState(labelSelectState);

  /* filter labels based on input */
  const filteredLabels =
    labels !== null
      ? query === ""
        ? labels
        : labels.filter((label) => {
            return label.name!.toLowerCase().includes(query.toLowerCase());
          })
      : labels;

  /* set labels when project data is fetched */
  useEffect(() => {
    if (project && project.labels) {
      setLabels(project.labels);
    }
  }, [project]);

  return (
    <Combobox as="div" value={selectedLabel} onChange={setSelectedLabel}>
      <div className="relative">
        <Combobox.Input
          className="w-36 h-10 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => {
            setQuery(event.target.value);
            if (event.target.value === "") {
              setSelectedLabel(null);
            }
          }}
          displayValue={(label: any) => label?.name}
          placeholder="Every label"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredLabels && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredLabels.map((label) => (
              <Combobox.Option
                key={label.id}
                value={label}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block truncate",
                        selected ? "font-semibold" : ""
                      )}
                    >
                      {label.name}
                    </span>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
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

export default LabelSelect;
