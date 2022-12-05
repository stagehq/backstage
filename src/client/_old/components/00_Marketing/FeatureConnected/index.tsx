import { Tab } from "@headlessui/react";
import clsx from "clsx";

const features = [
  {
    name: "Sync into",
    image: "/images/connected-1.svg",
    imageMobile: "/images/connected-mobile-1.svg",
    alt: "sync between gitprovider and Zirkular idea list",
  },
  {
    name: "Trigger",
    image: "/images/connected-2.svg",
    imageMobile: "/images/connected-mobile-2.svg",
    alt: "pull request triggers a codereview channel",
  },
];

function Feature({ feature, isActive, className, ...props }: any) {
  return (
    <div
      className={clsx(
        className,
        !isActive && "hover:bg-indigo-600/[0.06] rounded-lg"
      )}
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
    <Tab.Group as="div" className="mt-12 sm:hidden">
      {({ selectedIndex }) => (
        <>
          <Tab.List
            className="flex flex-row justify-center"
            aria-owns="headlessui-tabs-tab-16 headlessui-tabs-tab-17"
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
                  <div className="w-[calc(100vw_-_32px)] mt-16 overflow-hidden after:block after:absolute after:rounded-[50%] after:inset-32 after:bg-indigo-600/[0.16] after:blur-3xl after:-z-10">
                    <img
                      className="w-full"
                      src={feature.imageMobile}
                      alt={feature.alt}
                    />
                  </div>
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
    <Tab.Group as="div" className="hidden mt-12 sm:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List
            className="flex flex-row justify-center gap-x-2"
            aria-owns="headlessui-tabs-tab-20 headlessui-tabs-tab-21"
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
                  <div className="w-[600px] lg:w-[calc(100vw_-_64px)] max-w-[68rem] mt-10 overflow-hidden after:block after:absolute after:rounded-[50%] after:inset-32 after:bg-indigo-600/[0.12] after:blur-3xl after:-z-10">
                    <img
                      className="w-full"
                      src={feature.image}
                      alt={feature.alt}
                    />
                  </div>
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

export default function FeatureConnected() {
  return (
    <section className="pt-12 pb-10 sm:pt-16 lg:-mt-40 lg:pt-[300px] lg:pb-14 lg:overflow-hidden">
      <div className="mx-auto px-4 sm:px-0 sm:max-w-[600px] lg:max-w-6xl lg:px-8">
        <div className="w-full flex justify-center">
          <h2 className="max-w-sm sm:max-w-2xl font-sans text-4xl font-semibold tracking-tight text-black sm:text-6xl text-center">
            <span>In</span>
            <span className="font-handwritten font-normal text-5xl text-indigo-600 sm:text-[90px] sm:leading-none">
              {" perfect "}
            </span>
            <span>sync</span>
            <div className="inline-block">
              <span>with your tools</span>
            </div>
          </h2>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </div>
    </section>
  );
}
