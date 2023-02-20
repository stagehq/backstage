// write Image component herre

import { Block, Image } from "@stagehq/ui";
import { FC } from "react";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { SiteImage } from "../graphql/types.generated";
import { BlockProps } from "./type";

interface ImageProps extends Omit<BlockProps, "extension"> {
  image: SiteImage;
}

export const ImageBlock: FC<ImageProps> = ({
  size,
  image,
  gridRef,
  isEditable,
}) => {
  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

  if (!image.url) return null;

  return (
    <Block
      isEditable={true}
      size={size}
      handleSizeChange={
        isEditable
          ? (size) => changeExtensionSize(image.id, size, gridRef)
          : undefined
      }
      handleDelete={isEditable ? () => deleteExtension(image.id) : undefined}
    >
      <Image src={image.url} alt={image.alt ? image.alt : "image"} />
    </Block>
  );
};
