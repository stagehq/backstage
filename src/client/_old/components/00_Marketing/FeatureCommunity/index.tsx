import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";

const features = [
  {
    name: "Ideate",
    image: "/images/community-1.svg",
    alt: "idea with multiple features",
    description: function IdeateText() {
      return (
        <div className="flex flex-row justify-center items-center mx-auto mt-4 lg:mt-8 lg:w-1/2">
          <svg
            width="40"
            height="57"
            viewBox="0 0 40 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.24481 3.47129C11.5133 4.2027 13.9153 4.69079 18.242 5.93543C23.2632 7.43437 27.3009 8.52081 36.9948 10.9602"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M3.45831 53.8736C7.52062 52.3728 9.84488 51.5945 14.2143 50.509C19.3122 49.2966 23.3522 48.2186 32.967 45.4842"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M3 28.7852C7.35808 27.9689 9.83054 27.661 14.3797 27.8298C19.6734 28.1338 23.899 28.1428 34 27.8298"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <p className="mx-7 text-center">
            <strong className="font-semibold">
              Every great success starts with an idea.{" "}
            </strong>
            Write down what you have in mind and share it with your community.
          </p>
          <svg
            width="37"
            height="53"
            viewBox="0 0 37 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.1308 49.414C26.2389 48.7472 24.0488 48.3021 20.1039 47.1673C15.5257 45.8006 11.8443 44.8101 3.00578 42.5859"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M33.5821 3.45897C29.8783 4.82736 27.7591 5.53699 23.7752 6.5267C19.1271 7.63218 15.4436 8.61503 6.67713 11.1081"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M34 26C30.0637 26.8163 27.8305 27.1242 23.7215 26.9553C18.9402 26.6514 15.1235 26.6424 6 26.9553"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    },
  },
  {
    name: "React",
    image: "/images/community-2.svg",
    alt: "idea with reactions inside a thread",
    description: function ReactText() {
      return (
        <div className="flex flex-row justify-center items-center mx-auto mt-4 lg:mt-8 lg:w-1/2">
          <svg
            width="40"
            height="57"
            viewBox="0 0 40 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.24481 3.47129C11.5133 4.2027 13.9153 4.69079 18.242 5.93543C23.2632 7.43437 27.3009 8.52081 36.9948 10.9602"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M3.45831 53.8736C7.52062 52.3728 9.84488 51.5945 14.2143 50.509C19.3122 49.2966 23.3522 48.2186 32.967 45.4842"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M3 28.7852C7.35808 27.9689 9.83054 27.661 14.3797 27.8298C19.6734 28.1338 23.899 28.1428 34 27.8298"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <p className="mx-7 text-center">
            We want that your community has a strong communication culture by
            pushing each other to
            <strong className="font-semibold">
              {" "}
              react, give feedback and share opinions.
            </strong>
          </p>
          <svg
            width="37"
            height="53"
            viewBox="0 0 37 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.1308 49.414C26.2389 48.7472 24.0488 48.3021 20.1039 47.1673C15.5257 45.8006 11.8443 44.8101 3.00578 42.5859"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M33.5821 3.45897C29.8783 4.82736 27.7591 5.53699 23.7752 6.5267C19.1271 7.63218 15.4436 8.61503 6.67713 11.1081"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M34 26C30.0637 26.8163 27.8305 27.1242 23.7215 26.9553C18.9402 26.6514 15.1235 26.6424 6 26.9553"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    },
  },
  {
    name: "Organize",
    image: "/images/community-3.svg",
    alt: "organised ideas with labels",
    description: function OrganizeText() {
      return (
        <div className="flex flex-row justify-center items-center mx-auto mt-4 lg:mt-8 lg:w-3/5">
          <svg
            width="40"
            height="57"
            viewBox="0 0 40 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.24481 3.47129C11.5133 4.2027 13.9153 4.69079 18.242 5.93543C23.2632 7.43437 27.3009 8.52081 36.9948 10.9602"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M3.45831 53.8736C7.52062 52.3728 9.84488 51.5945 14.2143 50.509C19.3122 49.2966 23.3522 48.2186 32.967 45.4842"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M3 28.7852C7.35808 27.9689 9.83054 27.661 14.3797 27.8298C19.6734 28.1338 23.899 28.1428 34 27.8298"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <p className="mx-7 text-center">
            <strong className="font-semibold">
              It’s not ending up in a huge issue list.{" "}
            </strong>
            With Initiatives you can organize ideation items and input streams
            from your code plattform.
          </p>
          <svg
            width="37"
            height="53"
            viewBox="0 0 37 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.1308 49.414C26.2389 48.7472 24.0488 48.3021 20.1039 47.1673C15.5257 45.8006 11.8443 44.8101 3.00578 42.5859"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M33.5821 3.45897C29.8783 4.82736 27.7591 5.53699 23.7752 6.5267C19.1271 7.63218 15.4436 8.61503 6.67713 11.1081"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M34 26C30.0637 26.8163 27.8305 27.1242 23.7215 26.9553C18.9402 26.6514 15.1235 26.6424 6 26.9553"
              stroke="#6366F1"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    },
  },
];

function Feature({ feature, isActive, className, ...props }: any) {
  return (
    <div
      className={clsx(className, !isActive && "hover:bg-white rounded-lg")}
      {...props}
    >
      <h3
        className={clsx(
          "text-xl font-semibold text-center rounded-lg",
          isActive ? "text-indigo-600 bg-indigo-600/[0.16]" : "text-black"
        )}
      >
        {feature.name}
      </h3>
    </div>
  );
}

function FeaturesMobile() {
  return (
    <Tab.Group as="div" className="lg:hidden mt-12 sm:mt-16 block">
      {({ selectedIndex }) => (
        <>
          <Tab.List
            className="flex flex-row justify-center"
            aria-owns="headlessui-tabs-tab-4 headlessui-tabs-tab-5 headlessui-tabs-tab-6"
          >
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.name}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="py-2 px-5 font-semibold text-base lg:text-lg [&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="relative overflow-hidden rounded-4xl">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.name}
                  className={clsx(
                    "px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none",
                    featureIndex !== selectedIndex && "opacity-60"
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[calc(100vw_-_32px)] sm:w-[600px] h-[calc((100vw_-_32px)_*_0.4)] sm:h-[calc(600px_*_0.4)] max-w-[76rem] mt-10 overflow-hidden after:block after:absolute after:rounded-[50%] after:inset-32 after:bg-indigo-600/[0.08] after:blur-3xl after:-z-10 relative">
                    <Image
                      className="w-full h-full"
                      src={feature.image}
                      alt={feature.alt}
                      layout="fill"
                      objectFit="contain"
                      priority={true}
                    />
                  </div>
                  <feature.description />
                </Tab.Panel>
              ))}
            </div>
            <div className="pointer-events-none absolute" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
}

function FeaturesDesktop() {
  return (
    <Tab.Group as="div" className="hidden lg:-mt-16 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List
            className="flex flex-row justify-end gap-x-2"
            aria-owns="headlessui-tabs-tab-10 headlessui-tabs-tab-11 headlessui-tabs-tab-12"
          >
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.name}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="py-2 px-7 font-semibold text-base lg:text-lg [&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="relative overflow-hidden rounded-4xl">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.name}
                  className={clsx(
                    "px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none",
                    featureIndex !== selectedIndex && "opacity-60"
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[calc(100vw_-_64px)] max-w-[1088px] h-[calc((100vw_-_64px)*0.4)] max-h-[calc(1088px_*_0.4)] max-w-[68rem] mt-10 overflow-hidden after:block after:absolute after:rounded-[50%] after:inset-32 after:bg-indigo-600/[0.08] after:blur-3xl after:-z-10 relative">
                    <Image
                      className="w-full h-full"
                      src={feature.image}
                      alt={feature.alt}
                      layout="fill"
                      objectFit="contain"
                      priority={true}
                    />
                  </div>
                  <feature.description />
                </Tab.Panel>
              ))}
            </div>
            <div className="pointer-events-none absolute" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
}

export default function FeatureCommunity() {
  return (
    <section className="bg-[#F5F7FE] mt-4 pt-10 pb-10 sm:pt-16 lg:-mt-56 lg:pt-[350px] lg:pb-24 lg:overflow-hidden">
      <div className="mx-auto px-4 sm:px-0 sm:max-w-[600px] lg:max-w-6xl lg:px-8">
        <div className="max-w-sm sm:max-w-lg mx-auto lg:mx-0">
          <h2 className="font-sans text-4xl tracking-tight font-semibold text-black sm:text-6xl text-center lg:text-left">
            <span>Let's shape the </span>
            <div className="inline-block">
              <span>future</span>
              <div className="inline-block">
                <span className="font-handwritten font-normal text-5xl text-indigo-600 sm:text-[90px] sm:leading-none">
                  , together.
                </span>
                <img
                  className="absolute w-40 translate-x-4 -translate-y-[10px] sm:w-fit sm:translate-x-10 sm:-translate-y-5"
                  src="/images/community-underline-handwritten.svg"
                  alt="underline"
                />
              </div>
            </div>
          </h2>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </div>
    </section>
  );
}
