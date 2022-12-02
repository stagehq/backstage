import React, { FC } from "react";

const items: FeatureCommunicationItemProps[] = [
  {
    image: "/images/threads.svg",
    imageAlt: "thread",
    text: (
      <>
        <strong className="font-semibold">Powerful threading</strong> for
        efficient channels
      </>
    ),
  },
  {
    image: "/images/channels.svg",
    imageAlt: "channel",
    text: (
      <>
        Topic-related and structured{" "}
        <strong className="font-semibold">channels</strong>
      </>
    ),
  },
  {
    image: "/images/one-one.svg",
    imageAlt: "chat",
    text: (
      <>
        Uncomplicated{" "}
        <strong className="font-semibold">one-to-one conversations</strong>
      </>
    ),
  },
];

interface FeatureCommunicationItemProps {
  image: string;
  imageAlt: string;
  text: React.ReactNode;
}

const FeatureCommunicationItem: FC<FeatureCommunicationItemProps> = ({
  image,
  imageAlt,
  text,
}) => {
  return (
    <div className="bg-white p-3 w-full shadow-xl rounded-2xl">
      <div className="flex flex-row items-center gap-4">
        <img className="lg:w-24 lg:h-24 w-16 h-16" src={image} alt={imageAlt} />
        <p className="text-base text-gray-600 sm:text-xl lg:text-lg">{text}</p>
      </div>
    </div>
  );
};

export default function FeatureCommunication() {
  return (
    <section className="bg-[#F1F1FC] pt-10 pb-10 sm:pt-16 lg:pt-32 lg:pb-14">
      <div className="w-[calc(100vw_-_32px)] sm:w-[600px] lg:w-[calc(100vw_-_64px)] mx-auto max-w-6xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="col-span-8 sm:text-center lg:text-left">
            <h2 className="font-sans text-3xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
              <span className="inline-block overflow-hidden whitespace-nowrap">
                Make open-source a
              </span>
              <div className="inline-block overflow-hidden whitespace-nowrap sm:whitespace-normal sm:w-fit sm:mx-auto lg:w-full">
                <span className="relative">
                  <span className="pr-1 sm:pr-2 font-handwritten font-normal text-4xl text-indigo-600 sm:text-[75px] lg:text-[90px]  sm:leading-none">
                    multiplayer
                  </span>
                  <img
                    className="absolute w-44 -translate-y-[10px] sm:w-fit sm:-translate-y-4 lg:-translate-y-5"
                    src="/images/communication-underline.svg"
                    alt="underline"
                  />
                </span>{" "}
                <span>experience</span>
              </div>
            </h2>
            <p className="mt-6 md:max-w-full lg:max-w-2xl sm:text-center text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-left lg:text-lg">
              <strong className="text-black font-semibold">
                With Zirkular, team communication is a no-brainer and just
                works.
              </strong>{" "}
              Every message stays documented and is linkable to everything.
            </p>
            <div className="relative">
              <img
                className="w-32 lg:w-64 hidden lg:block absolute left-0 top-20"
                src="/images/controller.svg"
                alt="scribbled controller"
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-4 mt-8">
              {items.map((item, index) => {
                return <FeatureCommunicationItem key={index} {...item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
