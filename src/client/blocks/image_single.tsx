// write Image component herre

import { Block, Image } from "@stagehq/ui";
import { defineArguments } from "graphql/type/definition";
import { FC, useEffect, useState } from "react";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { SiteImage } from "../graphql/types.generated";
import { BlockProps } from "./type";

const ImageBlock: FC<BlockProps> = ({
  size,
  extension,
  gridRef,
  isEditable,
}) => {

  console.log(extension);
  
  const [path, setPath] = useState("");

  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

  useEffect(() => {
    if (extension.underlayingApis) {
      extension.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "images") {
          api.apiResponses?.forEach((apiResponse) => {
            if (path === "") {
              setPath(apiResponse.response.path);
            }
          });
        }
      });
    }
  }, [extension]);

  useEffect(() => {
    if (path !== "") {
      const reader = new FileReader();
    }
  }, [path]);

  return (
    <Block
      isEditable={true}
      size={size}
      handleSizeChange={
        isEditable
          ? (size) => changeExtensionSize(extension.id, size, gridRef)
          : undefined
      }
      handleDelete={isEditable ? () => deleteExtension(extension.id) : undefined}
    >
      <Image src={path} alt={path ? path : "image"} />
    </Block>
  );
};

export default ImageBlock;