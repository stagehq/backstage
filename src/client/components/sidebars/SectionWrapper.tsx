import { useKBar } from "kbar";
import { Icon } from "../Icons";

interface Props {
  children: React.ReactNode;
}

const SectionWrapper = (props: Props) => {
  const { query } = useKBar();

  return (
    <div className="flex flex-col w-full bg-white gap-2">
      <div className="flex justify-between items-center w-full h-10 pl-6 pr-[22px]">
        <p className="text-sm font-semibold text-left text-zinc-900">
          Sections
        </p>
        <div
          onClick={query.toggle}
          className="flex justify-center items-center w-6 h-6 gap-2 hover:bg-zinc-100 rounded"
        >
          <Icon name="PlusSmallIcon" color="dark" size="md" />
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-2">{props.children}</div>
    </div>
  );
};

export default SectionWrapper;
