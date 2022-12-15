import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";
import Spinner from "../../../../components/loading/Spinner";
import { SubmitStateType } from "../Homepage";

interface HeroProps {
  email: string | null;
  setEmail: (value: string | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitState: SubmitStateType;
}

const Hero: FC<HeroProps> = ({
  email,
  setEmail,
  handleSubmit,
  submitState,
}) => {
  return (
    <section className="hero-gradient 2xl:hero-gradient-2xl pt-10 pb-10 sm:pt-16 lg:pt-16 lg:pb-20 lg:overflow-hidden">
      <div className="mx-auto max-w-6xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="lg:py-24">
              <h1 className="mt-12 mb-16 text-4xl tracking-tight font-semibold text-black sm:mt-16 sm:mb-28 sm:text-6xl lg:mt-6 lg:mb-16">
                <span className="block lg:block lg:whitespace-nowrap">
                  Building healthy{" "}
                </span>
                <span className="block lg:block lg:whitespace-nowrap">
                  open-source{" "}
                </span>
                <div className="lg:inline-block xl:block">
                  <span>is hard.</span>
                  <img
                    className="absolute w-36 -translate-x-2 -translate-y-8 sm:w-fit sm:translate-x-44 sm:-translate-y-12 lg:-translate-x-4"
                    src="/images/hero-strikethrough.svg"
                    alt="strikethrough"
                  />
                  <span className="absolute text-indigo-600 text-5xl font-normal font-handwritten w-max z-10 translate-y-10 -translate-x-16 sm:text-7xl sm:translate-y-16 sm:-translate-x-[272px] lg:translate-y-4 lg:translate-x-4">
                    should be fun
                  </span>
                </div>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg">
                <strong className="text-black font-semibold">
                  Zirkular connects contributors and maintainers in a
                  community-first workspace
                </strong>{" "}
                with goal-oriented communication, efficient workflows and smart
                automations.
              </p>
              <div className="mt-10">
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="sm:max-w-xl sm:mx-auto lg:mx-0"
                >
                  <div className="flex gap-2 mb-2 sm:mb-4">
                    <img
                      className="w-6 h-6 sm:w-7 sm:h-7"
                      src="/icons/icon-listadd.svg"
                      alt="add to list icon"
                    />
                    <span className="text-indigo-600 font-bold sm:text-xl">
                      Apply for Private Beta
                    </span>
                  </div>
                  <div className="sm:flex">
                    <div className="min-w-0 flex-1">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
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
                  <div className="absolute">
                    {submitState === "Success" ? (
                      <p className="text-green-600 pt-3 pl-1 flex gap-2">
                        <CheckCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                        Thanks, please verify your email.
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
          <div className="mt-12 -mb-16 lg:m-0 lg:relative">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 w-full relative h-[calc((100vw_-_32px)_*_1.5)] md:h-[calc(500px_*_1.6)] md:h-[calc(500px_*_1.4)]">
              <Image
                className="mt-16 mr-32 w-full h-full px-4"
                src="/images/hero.svg"
                alt="Teaser of Zirkular workspace"
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </div>
          </div>
        </div>
        <div className="mt-32 lg:mt-16 xl:mt-20">
          <p className="font-display text-xl text-center text-[#909CB2]">
            Inspired by communities like
          </p>
          <ul
            role="list"
            className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 lg:flex-row lg:gap-x-12 lg:gap-y-0"
          >
            {[
              [
                {
                  name: "Go",
                  logo: "/images/logos/logo-golang.svg",
                  link: "https://go.dev/",
                },
                {
                  name: "Material UI",
                  logo: "/images/logos/logo-material-ui.svg",
                  link: "https://mui.com/",
                },
                {
                  name: "Joomla!",
                  logo: "/images/logos/logo-joomla.svg",
                  link: "https://www.joomla.org/",
                },
              ],
              [
                {
                  name: "Freecodecamp",
                  logo: "/images/logos/logo-freecodecamp.svg",
                  link: "https://www.freecodecamp.org/",
                },
                {
                  name: "Redhat Openshift",
                  logo: "/images/logos/logo-openshift.svg",
                  link: "https://www.redhat.com/en/technologies/cloud-computing/openshift",
                },
                {
                  name: "Drupal",
                  logo: "/images/logos/logo-drupal.svg",
                  link: "https://www.drupal.org/",
                },
              ],
            ].map((group, groupIndex) => (
              <li key={groupIndex}>
                <ul
                  role="list"
                  className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
                >
                  {group.map((company) => (
                    <li key={company.name} className="flex">
                      <a
                        href={company.link}
                        rel="noopener"
                        target="_blank"
                        className="h-12 sm:h-14 w-20 relative"
                      >
                        <Image
                          src={company.logo}
                          alt={company.name}
                          className="h-full w-full relative"
                          layout="fill"
                          objectFit="contain"
                          priority={true}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Hero };
