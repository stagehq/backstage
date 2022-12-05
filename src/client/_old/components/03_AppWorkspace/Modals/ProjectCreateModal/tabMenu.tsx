import clsx from "clsx";
import { FC } from "react";
import { ProjectCreateNavProps } from "./index";

interface tabDataType {
  name: string;
  link: "import" | "manual";
}

const tabs: tabDataType[] = [
  { name: "Import", link: "import" },
  { name: "Manual", link: "manual" },
];

interface TabMenuProps {
  selected: ProjectCreateNavProps;
  setSelected: (value: ProjectCreateNavProps) => void;
}

const TabMenu: FC<TabMenuProps> = ({ selected, setSelected }) => {
  return (
    <div>
      <div className="">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              onClick={() => setSelected(tab.link)}
              className={clsx(
                selected === tab.link
                  ? "bg-gray-100 text-gray-700"
                  : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm rounded-md cursor-pointer"
              )}
              aria-current={selected === tab.link ? "page" : undefined}
            >
              {tab.name}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabMenu;
