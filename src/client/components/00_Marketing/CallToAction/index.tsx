import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { FC } from "react";
import Spinner from "../../02_AppGlobal/Icons/Spinner";
import { SubmitStateType } from "../Homepage";

interface CallToActionProps {
  email: string | null;
  setEmail: (value: string | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitState: SubmitStateType;
}

export const CallToAction: FC<CallToActionProps> = ({
  email,
  setEmail,
  handleSubmit,
  submitState,
}) => {
  return (
    <section className="pt-10 pb-12 sm:pt-16 lg:pt-24 lg:pb-16 lg:overflow-hidden">
      <div className="mx-auto px-4 sm:px-0 sm:max-w-[600px] lg:max-w-6xl lg:px-8">
        <img
          className="absolute w-20 translate-x-[70vw] translate-y-4 sm:w-24 sm:translate-x-[28rem] sm:translate-y-12 lg:w-fit lg:hidden xl:block xl:-translate-x-20 xl:translate-y-48 pointer-events-none"
          src="/images/cta-hype.svg"
          alt="person sending fire emojis"
        />
        <div className="border-indigo-600 border-4 rounded-[20px] bg-[#F3F3FC] p-8 sm:p-16 xl:p-24 lg:pb-16 flex flex-col">
          <div className="flex flex-col sm:flex-row">
            <div className="lg:w-1/2 lg:min-w-[440px]">
              <h2 className="font-sans text-3xl tracking-tight font-semibold text-black mx-auto max-w-sm mb-12 text-center sm:text-left sm:text-6xl sm:max-w-none">
                <div className="inline-block">
                  <span className="font-handwritten font-normal text-5xl text-indigo-600 sm:text-[90px] sm:leading-none">
                    Apply
                  </span>
                  <img
                    className="absolute w-20 -translate-y-3 sm:w-fit sm:translate-x-2 sm:-translate-y-6"
                    src="/images/cta-underline-handwritten.svg"
                    alt="underline"
                  />
                </div>
                <span> to join our Private Beta</span>
              </h2>
              <ul>
                {[
                  {
                    text: "Get exclusive access",
                  },
                  {
                    text: "Stay informed",
                  },
                  {
                    text: "Share your opinion",
                  },
                ].map((item, itemIndex) => (
                  <li key={itemIndex} className="flex flex-row gap-5 py-2">
                    <img src="/icons/icon-tick-handwritten.svg" alt="Tick" />
                    <div className="flex items-center">
                      <p className="text-black text-lg">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2 hidden lg:block">
              <img
                src="/images/cta-tool.svg"
                alt="simplified Zirkular idea threads"
                className="absolute lg:w-[calc((100vw_-_200px)_/_2_-_20px)] lg:translate-x-8 lg:-translate-y-[29%] xl:-translate-y-48 xl:translate-x-4 xl:w-[480px] pointer-events-none"
              />
            </div>
          </div>
          <div className="mt-12 w-full self-end">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="sm:max-w-xl sm:mx-auto lg:mx-0"
            >
              <div className="sm:flex">
                <div className="min-w-0 flex-1">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-calltoaction"
                    type="email"
                    value={email === null ? "" : email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address ..."
                    className="block w-full px-4 py-3 rounded-md border-1 border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className={clsx(
                      submitState === "Success" ? "opacity-50" : "",
                      "cursor-pointer flex justify-center w-full py-3 pl-7 pr-6 rounded-md shadow bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                    )}
                  >
                    Send
                    {submitState === "Loading" ? (
                      <div className="w-6 h-6 ml-4 -mr-2 mt-0.5 -mb-0.5">
                        <Spinner color={"text-white"} />
                      </div>
                    ) : (
                      <img
                        className="w-6 h-6 ml-2"
                        src="/icons/icon-arrow-circle-right.svg"
                        alt="arrow right icon"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="sm:absolute">
                {submitState === "Success" ? (
                  <p className="text-green-600 pt-3 pl-1 flex gap-2">
                    <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                    Subscription approved
                  </p>
                ) : (
                  ""
                )}
                {submitState === "Error" ? (
                  <p className="text-red-600 pt-3 pl-1 flex gap-2">
                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                    Something went wrong!
                  </p>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
