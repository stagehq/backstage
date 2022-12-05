import { ChangeEvent, FC } from "react";

interface ImageUploadProps {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ onSelectFile }) => {
  return (
    <div className="">
      <input type="file" accept="image/*" onChange={onSelectFile} />
    </div>
  );
};

export default ImageUpload;
