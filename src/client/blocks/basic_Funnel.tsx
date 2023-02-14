import { Block } from "@stagehq/ui";
import { FC, useState } from "react";
import { useChangeBlockTitle } from "../components/studio/hooks/useChangeBlockTitle";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { BlockProps } from "./type";

const BasicFunnel: FC<BlockProps> = ({
  gridRef,
  extension,
  size,
  isEditable,
}) => {

  console.log(extension);
  
  const changeBlockTitle = useChangeBlockTitle();
  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

  return (
    <Block
      actions={{
        "link": {
          "url": "https://www.google.com"
        }
      }}
      title={extension.title ? extension.title : "Hire me!"}
      size={size}
      isEditable={isEditable}
      handleTitleChange={
        isEditable
          ? (title) => changeBlockTitle(extension.id, title)
          : undefined
      }
      handleSizeChange={
        isEditable
          ? (size) => changeExtensionSize(extension.id, size, gridRef)
          : undefined
      }
      handleDelete={
        isEditable ? () => deleteExtension(extension.id) : undefined
      }
      imagePath={"https://avatars.githubusercontent.com/u/9919?s=200&v=4"}
    >
    </Block>
  );
};

export default BasicFunnel;
