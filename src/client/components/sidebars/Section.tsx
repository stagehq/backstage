import { FC } from "react";

export interface SectionPops {
  id: number;
  text: string;
  icon: string;
  draggable: boolean;
  error: boolean;
  type: string;
}

interface SectionListItem {
  section: SectionPops;
  isDragging: boolean;
}

export enum ItemTypes {
  CARD = "card",
}

const Section: FC<SectionListItem> = ({ section }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full h-12 px-4 text-sm text-gray-700 bg-white border-b border-gray-200">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center justify-center w-8 h-8 mr-2 text-white bg-gray-400 rounded-full">
          <i className={section.icon}></i>
        </div>
        <div className="text-sm font-medium">{section.text}</div>
      </div>
      <div className="flex flex-row items-center justify-center w-8 h-8 text-gray-400 rounded-full">
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default Section;
