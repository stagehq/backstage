// write Image component herre

import { Block, Card } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { BlockProps } from "./type";

interface Link {
  title: string;
  description: string;
  favicon: string;
  ogImage: string;
  url: string;
  mainColor: string;
}

const LinkBlock: FC<BlockProps> = ({
  size,
  extension,
  gridRef,
  isEditable,
}) => {
  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

  // create a state for the link
  const [link, setLink] = useState<Link>();

  useEffect(() => {
    if (extension.underlayingApis) {
      extension.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "links") {
          api.apiResponses?.forEach((apiResponse) => {
            setLink(apiResponse.response);
          });
        }
      });
    }
  }, [extension]);

  return (
    <>
      {link && (
        <Block
          isEditable={isEditable}
          size={size}
          handleSizeChange={
            isEditable
              ? (size) => changeExtensionSize(extension.id, size, gridRef)
              : undefined
          }
          handleDelete={
            isEditable ? () => deleteExtension(extension.id) : undefined
          }
        >
          <Card
            actions={{ open: { url: link.url } }}
            title={link.title}
            subtitle={link.description}
            image={link.ogImage}
            imageAlt={link.title}
            type="vertical"
            bordered={false}
          />
        </Block>
      )}
    </>
  );
};

export default LinkBlock;
