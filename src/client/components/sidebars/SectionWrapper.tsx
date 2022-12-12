interface Props {
  children: React.ReactNode;
}

const SectionWrapper = (props: Props) => {
  return (
    <div className="flex flex-col w-full bg-white gap-2">
      <div className="flex justify-between items-center w-full h-10 pl-6 pr-[22px]">
        <p className="text-sm font-semibold text-left text-zinc-900">
          Sections
        </p>
        <div className="flex justify-center items-center w-6 h-6 gap-2 hover:bg-zinc-100 rounded">
          <PlusIcon />
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-2">{props.children}</div>
    </div>
  );
};

export default SectionWrapper;

const PlusIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      preserveAspectRatio="none"
    >
      <path
        d="M10 5V15M15 10H5"
        stroke="#52525B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
