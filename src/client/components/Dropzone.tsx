import React, { ReactNode, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { uploadFile } from "../../server/aws/helper";
import { User } from "../graphql/types.generated";
import { useUpdateUploadCreditMutation } from "../graphql/updateUploadCredit.generated";
import { useUpdateUserMutation } from "../graphql/updateUser.generated";
import { currentUserState } from "../store/user";

export interface DropzoneProps {
  children?: ReactNode;
  noClick?: boolean;
  type: uploadType;
  user: User;
}

export type uploadType =
  | "profileImage"
  | "profileCoverImage"
  | "siteImage"
  | "blockImage";

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
  const [, updateUploadCredit] = useUpdateUploadCreditMutation();

  // handle image chnange and current user state image to new image
  const handleImageChange = (url: string) => {
    updateUploadCredit().then((result) => {
      if (result.data?.updateUploadCredit) {
        // console.log("Updated Credit");
      } else {
        throw new Error("Error adding upload credit to user");
      }
    });

    if (url === "" || currentUser === null) return;
    setCurrentUser({
      ...currentUser,
      image: url,
    });
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    if (currentUser?.uploadCredit && currentUser.uploadCredit < 100) {
      setFiles(
        acceptedFiles.map((file: any) => {
          // console.log(file);

          uploadFile(file ? file : null, user.id, type).then((data) => {
            // Update user images
            updateUser({
              coverImageUrl: type === "profileCoverImage" ? data : undefined,
              image: type === "profileImage" ? data : undefined,
            }).then((result) => {
              // Success messages if image is uploaded
              if (result.data?.updateUser) {
                // console.log("Success");
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
    } else {
      toast.error(
        "Wow, you already uploaded 200 images!! Congrats 🎊 If you want more images, please get in touch."
      );
    }
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
      aria-label="Dropzone"
      className="rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
