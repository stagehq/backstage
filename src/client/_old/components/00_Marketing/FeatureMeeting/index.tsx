const features = [
  {
    number: "1.",
    image: "/images/meeting-1.svg",
    alt: "idea list",
    description: function IdeateText() {
      return (
        <>
          <p className="text-[#33278C] text-lg">
            <strong className="font-semibold">Add everything</strong> important
            to the meeting waitlist
          </p>
        </>
      );
    },
  },
  {
    number: "2.",
    image: "/images/meeting-2.svg",
    alt: "agenda",
    description: function IdeateText() {
      return (
        <>
          <p className="text-[#33278C] text-lg">
            Use the <strong className="font-semibold">ready-made agenda</strong>
          </p>
        </>
      );
    },
  },
  {
    number: "3.",
    image: "/images/meeting-3.svg",
    alt: "meeting notes",
    description: function IdeateText() {
      return (
        <>
          <p className="text-[#33278C] text-lg">
            <strong className="font-semibold">Update everyone</strong> with
            automated meeting notes
          </p>
        </>
      );
    },
  },
];

export default function FeatureMeeting() {
  return (
    <section className="pt-10 pb-12 sm:pt-16 lg:pt-32 lg:pb-40 lg:overflow-hidden">
      <div className="mx-auto px-4 sm:px-0 sm:max-w-[600px] lg:max-w-6xl lg:px-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-black text-center mx-auto max-w-sm sm:text-6xl sm:max-w-none">
          <div className="w-fit mx-auto">
            <span>Meetings, </span>
            <div className="inline-block">
              <span>meetings,&nbsp;</span>
              <img
                className="absolute w-[168px] -translate-x-1 -translate-y-5 sm:w-fit sm:-translate-x-3 sm:-translate-y-8"
                src="/images/meeting-strikethrough-handwritten.svg"
                alt="underline"
              />
            </div>
            <div className="inline-block">
              <span>meetings</span>
              <img
                className="absolute w-[168px] -translate-x-1 -translate-y-5 sm:w-fit sm:-translate-x-3 sm:-translate-y-8"
                src="/images/meeting-strikethrough-handwritten.svg"
                alt="underline"
              />
            </div>
          </div>
          <div>
            <div className="inline-block">
              <span className="font-handwritten font-normal text-5xl text-indigo-600 sm:text-[90px] sm:leading-none">
                less and better
              </span>
              <img
                className="absolute w-60 -translate-y-2 sm:w-fit sm:translate-x-2 sm:-translate-y-4"
                src="/images/meeting-underline-handwritten.svg"
                alt="underline"
              />
            </div>
          </div>
        </h2>
        <p className="max-w-3xl mt-12 mx-auto text-lg text-center">
          <strong className="font-semibold">
            With Status meetings we introduce a win-win-win feature.
          </strong>{" "}
          Contributors can push their topics, maintainers can save time and the
          software improves.
        </p>
        <div className="max-w-6xl mt-16 flex flex-col gap-5 lg:grid lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="first:z-10 bg-[#D9DAF4] drop-shadow-[0_20px_20px_rgba(76,78,220,0.1)] rounded-[20px] pl-8 pr-2 py-1 flex flex-row-reverse justify-between gap-1 lg:flex-col lg:py-7 lg:px-10 lg:h-[100%] xl:h-[560px]"
            >
              <img
                src={feature.image}
                alt={feature.alt}
                className="w-1/2 lg:absolute lg:w-[calc((100vw_-_64px_-_40px)_/_3_+_36px)] lg:max-w-[390px] lg:-translate-x-10"
              />
              <div className="w-1/2 sm:w-2/5 lg:w-auto my-3">
                <p className="font-handwritten text-indigo-600 text-6xl lg:mt-[120%] xl:mt-[362px]">
                  {feature.number}
                </p>
                <feature.description />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
