"use client";

import {
  ArrowCircleDownIcon,
  CheckCircleIcon,
  DotsCircleHorizontalIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { resolveValue, Toast, toast, Toaster } from "react-hot-toast";

import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const renderToastTypeIcon = (type: string) => {
  switch (type) {
    case "success":
      return (
        <CheckCircleIcon
          className="h-6 w-6 text-green-400"
          aria-hidden="true"
        />
      );
    case "blank":
      return (
        <InformationCircleIcon
          className="h-6 w-6 text-blue-400"
          aria-hidden="true"
        />
      );
    case "error":
      return (
        <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
      );
    case "loading":
      return (
        <ArrowCircleDownIcon
          className="h-6 w-6 text-blue-400"
          aria-hidden="true"
        />
      );
    case "custom":
      return (
        <DotsCircleHorizontalIcon
          className="h-6 w-6 text-blue-400"
          aria-hidden="true"
        />
      );
    default:
      return (
        <DotsCircleHorizontalIcon
          className="h-6 w-6 text-blue-400"
          aria-hidden="true"
        />
      );
  }
};

export default function ToasterComponent() {
  return (
    <Toaster position="top-right">
      {(t: Toast) => (
        <>
          {/* Global notification live region, render this permanently at the end of the document */}
          <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
          >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
              {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
              <Transition
                show={t.visible}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {renderToastTypeIcon(t.type)}
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                          {resolveValue(t.message, t)}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex">
                        <button
                          className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => toast.dismiss(t.id)}
                        >
                          <span className="sr-only">Close</span>
                          <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Toaster>
  );
}
