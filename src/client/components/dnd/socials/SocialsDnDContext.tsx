import { FC } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface SocialsDnDContextProps {
  children: React.ReactNode;
  onDragEnd: (result: any) => void;
}

export const SocialsDnDContext: FC<SocialsDnDContextProps> = ({
  children,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
