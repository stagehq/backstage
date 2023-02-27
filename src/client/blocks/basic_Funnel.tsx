import { Block, Button } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeBlockTitle } from "../components/studio/hooks/useChangeBlockTitle";
import { useChangeBlockDescription } from "../components/studio/hooks/useChangeBlockDescription";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { BlockProps } from "./type";

const BasicFunnel: FC<BlockProps> = ({
  gridRef,
  extension,
  size,
  isEditable,
}) => {
  const [email, setEmail] = useState("");

  const changeBlockTitle = useChangeBlockTitle();
  const changeBlockDescription = useChangeBlockDescription();
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
      title={extension.title ? extension.title : "Let's talk!"}
      description={extension.description ? extension.description : ""}
      enableDescription={isEditable ? true : extension.description === "" ? false : true}
      
      size={size}
      handleTitleChange={
        isEditable
          ? (title) => changeBlockTitle(extension.id, title)
          : undefined
      }
      handleDescriptionChange={
        isEditable
          ? (description) => {changeBlockDescription(extension.id, description)}
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
      isEditable={isEditable}
    >
      <Button primary text="Contact me" icon="EnvelopeIcon" url={email}/>
    </Block>
  );
};

export default BasicFunnel;
