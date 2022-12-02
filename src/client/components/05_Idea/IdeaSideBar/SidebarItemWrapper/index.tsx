import { FC } from "react";
import LabelSelect from "../LabelItem/LabelSelect";

interface SideBarItemWrapperProps {
  children: React.ReactNode;
  title: string;
  number?: number;
  editable?: boolean;
}

const SidebarItemWrapper: FC<SideBarItemWrapperProps> = ({
  children,
  title,
  number,
  editable,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-3 items-center">
          <div className="text-gray-600 text-sm font-medium">{title}</div>
          <div className="text-xs leading-none font-normal text-slate-500">
            {number}
          </div>
        </div>
        {editable && <LabelSelect />}
      </div>
      <div className="flex flex-col gap-1 py-1">{children}</div>
    </div>
  );
};

export default SidebarItemWrapper;
