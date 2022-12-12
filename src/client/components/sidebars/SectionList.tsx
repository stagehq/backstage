import clsx from "clsx";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Icon, IconEnum } from "../Icons";
import EditSidebarPortal from "./EditSidebarPortal";

export interface Section {
  id: number;
  text: string;
  icon: IconEnum;
  selected: boolean;
  locked: boolean;
  error?: string;
}

export interface SectionListProps {
  sections: Section[];
}

const SectionList = () => {
  // sections state to be used in the list with website section names and ids
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      text: "Header",
      icon: "QueueListIcon",
      locked: true,
      selected: true,
    },
    {
      id: 2,
      text: "Blogs",
      icon: "DocumentIcon",
      locked: false,
      selected: false,
    },
    {
      id: 3,
      text: "GitHub",
      icon: "CodeBracketIcon",
      locked: false,
      selected: false,
    },
    {
      id: 4,
      text: "Music",
      icon: "MusicalNoteIcon",
      locked: false,
      selected: false,
    },
    {
      id: 5,
      text: "Projects",
      icon: "DocumentIcon",
      locked: false,
      selected: false,
    },
    {
      id: 6,
      text: "Footer",
      icon: "QueueListIcon",
      locked: true,
      selected: false,
    },
  ]);

  // a little function to help us with reordering the result
  const reorder = (list: Section[], startIndex: number, endIndex: number) => {
    // if endIndex is the first or the last item, return the list
    if (endIndex === 0 || endIndex === list.length - 1) return list;

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    console.log("result", result);

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedSections = reorder(
      sections,
      result.source.index,
      result.destination.index
    );

    setSections(reorderedSections);
  };

  const handleClick = (id: number) => {
    // if the section is not locked and not selected, set the selected section to true
    const newSections = sections.map((section) => {
      if (section.id === id) {
        return { ...section, selected: true };
      }
      return { ...section, selected: false };
    });

    setSections(newSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            className="flex flex-col w-full h-full overflow-y-auto px-3"
            onScroll={(e) =>
              // eslint-disable-next-line no-console
              console.log("current scrollTop", e.currentTarget.scrollTop)
            }
          >
            {sections.map((section, index) => (
              <SectionItem
                section={section}
                index={index}
                key={section.id}
                onClick={() => handleClick(section.id)}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;

const SectionItem = ({
  section,
  index,
  onClick,
}: {
  section: Section;
  index: number;
  onClick: () => void;
}) => {
  return (
    <Draggable
      key={section.id}
      isDragDisabled={section.locked}
      draggableId={section.id.toString()}
      index={index}
    >
      {(draggableProvided, draggableSnapshot) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          onClick={onClick}
          className={clsx(
            "flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-8 relative overflow-hidden gap-3 px-3 rounded mb-1 hover:cursor-pointer",
            section.selected ? "bg-zinc-100" : "bg-white"
          )}
          style={{
            cursor: "default",
          }}
        >
          <Icon name={section.icon} color={"dark"} size={"md"} />
          <div className="flex justify-start items-center flex-grow relative gap-2">
            <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-zinc-900 select-none">
              {section.text}
            </p>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-3 h-3 gap-1.5 px-1.5">
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[10.5px] h-[10.5px] relative gap-[2.625px]">
                {section.locked && <LockedIcon />}
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "items-center justify-center",
              section.locked ? "hidden" : "flex",
              section.selected ? "opacity-80" : "opacity-30"
            )}
          >
            <DragHandleIcon />
          </div>
          {section.selected && (
            <EditSidebarPortal>
              <span>this is a {section.text}</span>
            </EditSidebarPortal>
          )}
        </div>
      )}
    </Draggable>
  );
};

const LockedIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-[10.5px] h-[10.5px] relative"
      preserveAspectRatio="none"
    >
      <g clip-path="url(#clip0_341_28043)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.00117 1.2749C5.3746 1.2749 4.77369 1.52381 4.33063 1.96686C3.88758 2.40992 3.63867 3.01083 3.63867 3.6374V5.4749H3.37617C3.09769 5.4749 2.83062 5.58553 2.63371 5.78244C2.4368 5.97935 2.32617 6.24642 2.32617 6.5249V9.6749C2.32617 9.95338 2.4368 10.2205 2.63371 10.4174C2.83062 10.6143 3.09769 10.7249 3.37617 10.7249H8.62617C8.90465 10.7249 9.17172 10.6143 9.36863 10.4174C9.56555 10.2205 9.67617 9.95338 9.67617 9.6749V6.5249C9.67617 6.24642 9.56555 5.97935 9.36863 5.78244C9.17172 5.58553 8.90465 5.4749 8.62617 5.4749H8.36367V3.6374C8.36367 3.01083 8.11477 2.40992 7.67171 1.96686C7.22866 1.52381 6.62775 1.2749 6.00117 1.2749V1.2749ZM7.57617 5.4749V3.6374C7.57617 3.21969 7.41023 2.81908 7.11487 2.52371C6.8195 2.22834 6.41889 2.0624 6.00117 2.0624C5.58346 2.0624 5.18285 2.22834 4.88748 2.52371C4.59211 2.81908 4.42617 3.21969 4.42617 3.6374V5.4749H7.57617Z"
          fill="#18181B"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_341_28043">
          <rect
            width="10.5"
            height="10.5"
            fill="white"
            transform="translate(0.75 0.75)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

const DragHandleIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
      preserveAspectRatio="none"
    >
      <path
        d="M8.98454 14.0627C8.98454 14.6205 8.52673 15.0783 7.96891 15.0783C7.41109 15.0783 6.95329 14.6205 6.95329 14.0627C6.95329 13.5048 7.41109 13.047 7.96891 13.047C8.52673 13.047 8.98454 13.5048 8.98454 14.0627ZM6.95329 10.0002C6.95329 9.44234 7.41109 8.98454 7.96891 8.98454C8.52673 8.98454 8.98454 9.44234 8.98454 10.0002C8.98454 10.558 8.52673 11.0158 7.96891 11.0158C7.41109 11.0158 6.95329 10.558 6.95329 10.0002ZM6.95329 5.93766C6.95329 5.37984 7.41109 4.92204 7.96891 4.92204C8.52673 4.92204 8.98454 5.37984 8.98454 5.93766C8.98454 6.49548 8.52673 6.95329 7.96891 6.95329C7.41109 6.95329 6.95329 6.49548 6.95329 5.93766ZM13.047 5.93766C13.047 6.49548 12.5892 6.95329 12.0314 6.95329C11.4736 6.95329 11.0158 6.49548 11.0158 5.93766C11.0158 5.37984 11.4736 4.92204 12.0314 4.92204C12.5892 4.92204 13.047 5.37984 13.047 5.93766ZM11.0158 10.0002C11.0158 9.44234 11.4736 8.98454 12.0314 8.98454C12.5892 8.98454 13.047 9.44234 13.047 10.0002C13.047 10.558 12.5892 11.0158 12.0314 11.0158C11.4736 11.0158 11.0158 10.558 11.0158 10.0002ZM11.0158 14.0627C11.0158 13.5048 11.4736 13.047 12.0314 13.047C12.5892 13.047 13.047 13.5048 13.047 14.0627C13.047 14.6205 12.5892 15.0783 12.0314 15.0783C11.4736 15.0783 11.0158 14.6205 11.0158 14.0627Z"
        fill="#52525B"
        stroke="#52525B"
        strokeWidth="0.677083"
      ></path>
    </svg>
  );
};
