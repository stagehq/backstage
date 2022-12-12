import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export interface Section {
  id: number;
  text: string;
}

export interface SectionListProps {
  sections: Section[];
}

const SectionList = () => {
  // sections state to be used in the list with website section names and ids
  const [sections, setSections] = useState<Section[]>([
    { id: 1, text: "Header" },
    { id: 2, text: "Blogs" },
    { id: 3, text: "GitHub" },
    { id: 4, text: "Music" },
    { id: 5, text: "Projects" },
  ]);

  // a little function to help us with reordering the result
  const reorder = (list: Section[], startIndex: number, endIndex: number) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            className="flex flex-col w-full h-full overflow-y-auto"
            onScroll={(e) =>
              // eslint-disable-next-line no-console
              console.log("current scrollTop", e.currentTarget.scrollTop)
            }
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id.toString()}
                index={index}
              >
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className="flex flex-row items-center justify-between w-full h-12 px-4 text-sm text-gray-700 bg-white border-b border-gray-200"
                  >
                    {section.text}
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
