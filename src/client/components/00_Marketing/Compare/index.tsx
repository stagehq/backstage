import Image from "next/image";

export default function Compare() {
  return (
    <section className="pt-10 pb-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
      <div className="mx-auto max-w-6xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-5">
          <div className="flex flex-col items-center bg-white rounded-[20px] border-[3px] border-[#DBDEE2] gap-4 mx-4 mb-8 p-4 sm:mb-8 sm:mx-auto sm:px-12 sm:w-[600px] lg:m-0 lg:w-auto lg:p-8 xl:gap-0 xl:pt-16 xl:px-[72px] xl:pb-12">
            <span className="font-handwritten text-7xl text-[#4A4C4F]">
              old
            </span>
            <div className="flex justify-center items-center h-[calc((100vw_-_32px)*0.5)] sm:h-[240px] w-full my-4 relative">
              <Image
                className="w-9/10 h-full w-full"
                src="/images/compare-old.svg"
                alt="simplified issue list"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <ul className="p-2">
              {[
                {
                  strong: "Big effort to get up-to-date.",
                  text: "Distributed information in many issues and PRs.",
                },
                {
                  strong: "500 messages, 50 PRs.",
                  text: "Organizing community contribution is hard.",
                },
                {
                  strong: "Overwhelming amout of issues.",
                  text: "Many issues can't be resolved within a reasonable amount of time.",
                },
                {
                  strong: "A lot of overhead.",
                  text: "Maintainers have time-consuming tasks required to lead the community.",
                },
                {
                  strong: "Chaotic decision meetings.",
                  text: "Unable to make decisions in a timely manner.",
                },
                {
                  strong: "Information lost in chat.",
                  text: "Unable to keep track of important information.",
                },
                {
                  strong: "Backroom decisioning.",
                  text: "Community isn't always aware of what's happening.",
                },
              ].map((item, itemIndex) => (
                <li key={itemIndex} className="flex flex-row gap-5 p-2">
                  <img src="/icons/icon-cross-circle.svg" alt="Crossed" />
                  <div className="flex items-center lg:h-16">
                    <p className="text-gray-600">
                      <strong className="text-black font-semibold">
                        {item.strong}
                      </strong>{" "}
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center rounded-[20px] border-[3px] border-indigo-600 bg-[#F1F1FC] gap-4 mx-4 p-4 sm:mx-auto sm:px-12 sm:w-[600px] lg:m-0 lg:w-auto lg:p-8 xl:gap-0 xl:pt-16 xl:px-[72px] xl:pb-12">
            <span className="font-handwritten text-7xl text-indigo-600">
              new
            </span>
            <div className="flex justify-center items-center h-[calc((100vw_-_32px)*0.55)] sm:h-[240px] w-full my-4 relative drop-shadow-[0_20px_20px_rgba(76,78,220,0.1)]">
              <Image
                className="h-full w-full"
                src="/images/compare-new.svg"
                alt="simplified Zirkular workspace"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <ul className="p-2">
              {[
                {
                  strong: "Easy to get up-to-date.",
                  text: "Get up-to-date information in a single place.",
                },
                {
                  strong: "Documented conversations.",
                  text: "Link important information, documents, and discussions.",
                },
                {
                  strong: "Automated and smart.",
                  text: "The easiest way to manage your open-source project.",
                },
                {
                  strong: "Collaborate on ideas and initiatives.",
                  text: "Organize community contribution from idea to release.",
                },
                {
                  strong: "Powerful threading.",
                  text: "Orderly and structured. Every thread has one topic.",
                },
                {
                  strong: "Efficient Planning.",
                  text: "Organize and plan issues, ideas, PRs and releases.",
                },
                {
                  strong: "Transparent leading.",
                  text: "Maintainers can successfully lead the community by making decisions transparent.",
                },
                {
                  strong: "Ready-made agenda.",
                  text: "Community brings topics together.",
                },
              ].map((item, itemIndex) => (
                <li key={itemIndex} className="flex flex-row gap-5 p-2">
                  <img src="/icons/icon-tick-handwritten.svg" alt="Tick" />
                  <div className="flex items-center lg:h-16">
                    <p className="text-gray-600">
                      <strong className="text-black font-semibold">
                        {item.strong}
                      </strong>{" "}
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
