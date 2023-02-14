import { Block } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
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
  const [email, setEmail] = useState("");
  
  const changeBlockTitle = useChangeBlockTitle();
  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

  useEffect(() => {
    if (extension.underlayingApis) {
      extension.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "funnel") {
          api.apiResponses?.forEach((apiResponse) => {
            if (email === "") {
              setEmail(apiResponse.response.email);
            }
          });
        }
      });
    }
  }, [extension]);

  return (
    <Block
      actions={{
        "link": {
          "url": email
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
    >
    </Block>
  );
};

export default BasicFunnel;