import React, { ReactNode, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import { uploadFile } from "../../../../../server/aws/helper";
import { User } from "../../../../graphql/types.generated";
import { useUpdateUserMutation } from "../../../../graphql/updateUser.generated";
import { currentUserState } from "../../../../store/user";

export interface DropzoneProps {
  children?: ReactNode;
  noClick?: boolean;
  type: uploadType;
  user: User;
}

export type uploadType = "profileImage" | "profileCoverImage";

export const Dropzone: React.FC<DropzoneProps> = ({
  children,
  noClick,
  user,
  type,
  ...rest
}) => {
  const [files, setFiles] = useState([]);
  const [, updateUser] = useUpdateUserMutation();
  // recoil state for current user
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  // handle image chnange and current user state image to new image
  const handleImageChange = (url: string) => {
    if (url === "" || currentUser === null) return;
    setCurrentUser({
      ...currentUser,
      image: url,
    });
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: any) => {
        uploadFile(file ? file : null, user.id, type).then((data) => {
          // Update user images
          updateUser({
            coverImageUrl: type === "profileCoverImage" ? data : undefined,
            image: type === "profileImage" ? data : undefined,
          }).then((result) => {
            // Success messages if image is uploaded
            if (result.data?.updateUser) {
              console.log("Success");
              handleImageChange(
                result.data?.updateUser.image
                  ? result.data?.updateUser.image
                  : ""
              );
            } else {
              throw new Error("Error adding image to user");
            }
          });
        });
      })
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    noClick: noClick ? noClick : false,
  });

  return (
    <div
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      {...rest}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
