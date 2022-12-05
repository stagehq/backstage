import { Combobox, Popover, Transition } from "@headlessui/react";
import { CheckIcon, PlusSmIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { decodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import { FC, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import slug from "slug";
import { useCreateLabelMutation } from "../../../../../../graphql/createLabel.generated";
import { Label as LabelType } from "../../../../../../graphql/types.generated";
import {
  projectSlugState,
  projectState,
} from "../../../../../../store/project";
import {
  editLabelState,
  selectedLabelState,
} from "../../../../../../store/ui/label";
import { labelEditModalOpenState } from "../../../../../../store/ui/modals";
import Label, { colors } from "../../../../02_AppGlobal/Label";

const LabelSelect: FC = () => {
  /* helpers */
  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /* data */
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [labels, setLabels] = useState<LabelType[] | null>(null);
  const [, createLabel] = useCreateLabelMutation();

  /* ui states */
  const [query, setQuery] = useState("");
  // const [selectedLabels, setSelectedLabels] = useState<LabelType[]>([]);
  const [, setLabelEditModalOpen] = useRecoilState(labelEditModalOpenState);
  const [, setEditLabel] = useRecoilState(editLabelState);
  const [selectedLabels, setSelectedLabels] =
    useRecoilState(selectedLabelState);
  const [createColor, setCreateColor] = useState<string>(randomColor());
  const inputRef = useRef(null);
  const inputLength = useRef(null);
  const [width, setWidth] = useState(0);

  /* filter labels based on input without selectedLabels */
  const filteredLabels = useMemo(() => {
    if (!labels) {
      return [];
    }

    return labels
      .filter((label) => {
        if (!label.name) return false;
        return label?.name.toLowerCase().includes(query.toLowerCase());
        // &&
        // !selectedLabels.some(
        //   (selectedLabel) => selectedLabel.name === label.name
        // )
      })
      .sort((a, b) => {
        if (!a.name || !b.name) return 0;
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      })
      .slice(0, 10);
  }, [labels, query]);

  /* set labels when project data is fetched */
  useEffect(() => {
    if (project && project.labels) {
      setLabels(project.labels);
    }
  }, [project]);

  /* reset query when new label is selected */
  useEffect(() => {
    setQuery("");
  }, [selectedLabels]);

  /* set width of input */
  useEffect(() => {
    if (inputLength.current) {
      // @ts-ignore
      setWidth(inputLength.current.offsetWidth);
    }
  }, [inputLength, query]);

  // if new selectedLabel is not in project labels, add it
  useEffect(() => {
    if (!project || !project.labels) return;

    const newSelectedLabels: LabelType[] = selectedLabels.filter(
      (selectedLabel) => {
        if (!project.labels) return;
        return !project.labels.some(
          (projectLabel) => projectLabel.name === selectedLabel.name
        );
      }
    );

    if (
      Array.isArray(newSelectedLabels) &&
      newSelectedLabels.length &&
      newSelectedLabels[0].name &&
      newSelectedLabels[0].color &&
      newSelectedLabels[0].description === ""
    ) {
      setLabels([...project.labels, ...newSelectedLabels]);
      setProject({
        ...project,
        labels: [...project.labels, ...newSelectedLabels],
      });
      createLabel({
        name: newSelectedLabels[0].name,
        color: newSelectedLabels[0].color,
        description: newSelectedLabels[0].description,
        projectId: decodeGlobalID(project.id).id,
      });
      setCreateColor(randomColor());
    }
  }, [createLabel, project, selectedLabels, setProject]);

  // handler
  const focusInput = () => {
    if (inputRef.current !== null) {
      // @ts-ignore
      inputRef.current.focus();
    }
  };

  return (
    <>
      <Popover>
        <Popover.Button className="-my-1 relative w-7 h-7 text-slate-600 hover:bg-slate-200 rounded flex justify-center items-center cursor-pointer bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Open label options</span>
          <PlusSmIcon className="block h-5 w-5" aria-hidden="true" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Popover.Panel className="z-10 origin-top-right absolute translate-y-2 -translate-x-[292px] w-[320px] rounded-md shadow-lg bg-white divide-y divide-slate-100">
            <Combobox
              as="div"
              value={selectedLabels}
              onChange={setSelectedLabels}
              multiple
              nullable
            >
              <div className="relative">
                <div className="flex h-min-10 h-fit rounded-t-md border-b-2 border-slate-100">
                  <div
                    className="flex flex-wrap relative grow shrink basis-[0%] items-center overflow-hidden p-1"
                    onClick={focusInput}
                  >
                    {selectedLabels.length > 0 && (
                      <>
                        {selectedLabels.map((label) => (
                          <div className="inline-flex m-1 border-none">
                            <Label
                              key={label.name}
                              label={label}
                              removable={() => {
                                setSelectedLabels(
                                  selectedLabels.filter(
                                    (selectedLabel) =>
                                      selectedLabel.name !== label.name
                                  )
                                );
                              }}
                            />
                          </div>
                        ))}
                      </>
                    )}
                    <span
                      className="absolute opacity-0 -z-[100] whitespace-pre font-medium sm:text-sm"
                      ref={inputLength}
                    >
                      {query}
                    </span>
                    <Combobox.Input
                      ref={inputRef}
                      className={clsx(
                        "grow shrink basis-auto inline-grid row-start-1 col-start-1 row-end-2 col-end-3 grid-cols-[0px_min-content] mx-1 my-1.5 p-0 bg-white rounded-md font-medium sm:text-sm border-none focus:ring-transparent",
                        selectedLabels.length == 0 && "pl-1"
                      )}
                      style={{ width }}
                      onChange={(event) => {
                        setQuery(slug(event.target.value));
                      }}
                      onKeyDown={(event: any): void => {
                        if (event.keyCode === 8 && query === "") {
                          setSelectedLabels(selectedLabels.slice(0, -1));
                        }
                      }}
                      placeholder={
                        // if selectdLabels is empty, show placeholder Search for a label..., if labels is empty, show placeholder Create label, else not show nothing
                        selectedLabels.length === 0
                          ? labels?.length === 0
                            ? "Create label"
                            : "Search for a label..."
                          : ""
                      }
                      autoFocus
                    />
                  </div>
                </div>

                <Combobox.Options
                  static
                  className="max-h-80 overflow-auto w-full rounded-md bg-white text-base shadow-lg sm:text-sm"
                >
                  {filteredLabels.map((label) => (
                    <Combobox.Option
                      key={label.name}
                      value={label}
                      className={({ active }) =>
                        clsx(
                          "relative cursor-default select-none p-2 pl-8 font-medium text-xs text-slate-500",
                          active && "bg-slate-50",
                          !filteredLabels.some(
                            (filteredLabel) => filteredLabel.name === query
                          ) && "last:rounded-b-md"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-row justify-between">
                            <Label label={label} />
                            {active && (
                              <span
                                className={clsx(
                                  "inset-y-0 left-0 flex items-center pl-1.5 z-10",
                                  active && "text-gray-400"
                                )}
                                onClick={(e) => {
                                  console.log("clicked");

                                  e.stopPropagation();
                                  setEditLabel(label);
                                  setLabelEditModalOpen(true);
                                }}
                              >
                                <DotsHorizontalIcon
                                  className="h-5 w-5 hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                            {selected && (
                              <span
                                className={clsx(
                                  "absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                          <span>{label.description}</span>
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                  {query.length > 0 &&
                    !labels?.some((label) => label.name === query) && (
                      <Combobox.Option
                        className={({ active }) =>
                          clsx(
                            "relative cursor-default select-none p-2 pl-3 font-medium rounded-b-md",
                            active ? "bg-slate-50" : "text-slate-900"
                          )
                        }
                        value={{
                          id: "null",
                          name: query,
                          color: createColor,
                          description: "",
                        }}
                      >
                        {({ active }) => (
                          <div className="flex flex-row justify-between">
                            <div>
                              Create{" "}
                              <Label
                                label={{
                                  id: "null",
                                  name: query,
                                  color: createColor,
                                  description: "",
                                }}
                              />
                            </div>
                            {active && (
                              <span
                                className={clsx(
                                  "inset-y-0 left-0 flex items-center pl-1.5 z-10",
                                  active && "text-gray-400"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditLabel({
                                    id: "null",
                                    name: query,
                                    color: createColor,
                                    description: "",
                                  });
                                  setLabelEditModalOpen(true);
                                }}
                              >
                                <DotsHorizontalIcon
                                  className="h-5 w-5 hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                        )}
                      </Combobox.Option>
                    )}
                </Combobox.Options>
              </div>
            </Combobox>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default LabelSelect;
