import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useRef, useState } from "react";

import { decodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import { useRecoilState, useRecoilValue } from "recoil";
import slug from "slug";
import { useDeleteLabelMutation } from "../../../../../../graphql/deleteLabel.generated";
import { Label as LabelType } from "../../../../../../graphql/types.generated";
import { useUpdateLabelMutation } from "../../../../../../graphql/updateLabel.generated";
import {
  projectSlugState,
  projectState,
} from "../../../../../../store/project";
import {
  editLabelState,
  selectedLabelState,
} from "../../../../../../store/ui/label";
import { labelEditModalOpenState } from "../../../../../../store/ui/modals";
import { colors } from "../../../../02_AppGlobal/Label";

const LabelEditModal: FC = () => {
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [editLabel, setEditLabel] = useRecoilState(editLabelState);
  const [selectedLabels, setSelectedLabels] =
    useRecoilState(selectedLabelState);
  const [nameOld, setNameOld] = useState("");
  const [labelEditModalOpen, setLabelEditModalOpen] = useRecoilState(
    labelEditModalOpenState
  );
  const [, deleteLabel] = useDeleteLabelMutation();
  const [, updateLabel] = useUpdateLabelMutation();
  const cancelButtonRef = useRef(null);

  // useEffect set editLabel.name as oldName if labelEditModalOpen changes from false to true
  useEffect(() => {
    if (labelEditModalOpen) {
      if (editLabel && editLabel.name) {
        setNameOld(editLabel.name);
      }
    }
  }, [labelEditModalOpen]);

  return (
    <Transition.Root show={labelEditModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setLabelEditModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/* <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setLabelEditModalOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div> */}
                  <div className="sm:grid sm:grid-col sm:items-start gap-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="title"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={editLabel?.name ? editLabel.name : ""}
                          onChange={(e) => {
                            if (editLabel) {
                              setEditLabel({
                                ...editLabel,
                                name: slug(e.target.value),
                              });
                            }
                          }}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="color"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Color
                      </label>
                      <RadioGroup
                        value={editLabel?.color ? editLabel.color : colors[0]}
                        onChange={(color) => {
                          if (editLabel && color) {
                            setEditLabel({
                              ...editLabel,
                              color: color,
                            });
                          }
                        }}
                      >
                        <RadioGroup.Label className="sr-only">
                          Color
                        </RadioGroup.Label>
                        <div className="flex flex-row gap-2 mt-2 ml-1 ">
                          {colors.map((color) => (
                            <RadioGroup.Option
                              key={color}
                              value={color}
                              className={clsx(
                                "flex items-center justify-center h-8 w-8 rounded-full cursor-pointer focus:outline-none",
                                {
                                  "ring-2 ring-offset-2 ring-offset-gray-100 ring-slate-400 focus:ring-indigo-500":
                                    editLabel?.color === color,
                                },
                                {
                                  ["bg-red-500"]: color === "red",
                                },
                                {
                                  ["bg-orange-500"]: color === "orange",
                                },
                                {
                                  ["bg-yellow-500"]: color === "yellow",
                                },
                                {
                                  ["bg-green-500"]: color === "green",
                                },
                                {
                                  ["bg-cyan-500"]: color === "cyan",
                                },
                                {
                                  ["bg-blue-500"]: color === "blue",
                                },
                                {
                                  ["bg-purple-500"]: color === "purple",
                                },
                                {
                                  ["bg-pink-500"]: color === "pink",
                                },
                                {
                                  ["bg-gray-500"]: color === "gray",
                                }
                              )}
                            />
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={
                            editLabel?.description ? editLabel.description : ""
                          }
                          onChange={(e) => {
                            if (editLabel) {
                              setEditLabel({
                                ...editLabel,
                                description: e.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      console.log("update label");
                      console.log(editLabel, nameOld);
                      if (
                        editLabel &&
                        editLabel.name &&
                        editLabel.color &&
                        editLabel.description !== undefined &&
                        project &&
                        project.labels
                      ) {
                        // updateLabel in store
                        setSelectedLabels(
                          selectedLabels.map((label) => {
                            if (label.name === nameOld) {
                              return editLabel;
                            }
                            return label;
                          })
                        );
                        setProject({
                          ...project,
                          labels: project.labels.map((label) => {
                            if (label.name === nameOld) {
                              return editLabel;
                            }
                            return label;
                          }),
                        });
                        // updateLabel database
                        updateLabel({
                          projectId: decodeGlobalID(project.id).id,
                          nameOld: nameOld,
                          nameNew: editLabel.name,
                          color: editLabel.color,
                          description: editLabel.description as string,
                        });
                      }
                      setLabelEditModalOpen(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setLabelEditModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mr-auto inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => {
                      if (
                        editLabel &&
                        editLabel.name &&
                        project &&
                        project.labels
                      ) {
                        setSelectedLabels(
                          selectedLabels.filter(
                            (label) => label.name !== editLabel.name
                          )
                        );
                        setProject({
                          ...project,
                          labels: project?.labels.filter(
                            (label: LabelType) => label.name !== editLabel.name
                          ),
                        });
                        deleteLabel({
                          projectId: decodeGlobalID(project.id).id,
                          name: editLabel.name,
                        });
                        setLabelEditModalOpen(false);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LabelEditModal;
