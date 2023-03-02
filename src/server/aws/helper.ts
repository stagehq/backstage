// Upload files to aws

import { toast } from "react-hot-toast";
import { uploadType } from "../../client/components/Dropzone";

export const uploadFile = async (
  file: any,
  userId: string,
  type: uploadType
) => {
  if (!file) return;

  const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes
  console.log(file.size);
  if (file.size > maxFileSize) {
    console.log(maxFileSize);
    console.error(`File size of ${file.size} bytes exceeds the 2 MB limit.`);
    toast.error("File size is bigger than 2 MB limit.");
    return;
  }

  const regex = /image\/(jpeg|png|gif)/;
  const ext = file.type.match(regex)[1];
  const date = Date.now();

  console.log(process.env.NEXT_PUBLIC_HOST_URL);
  // Get presigned post call
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL
    }/api/aws/upload-url?file=${encodeURIComponent(
      userId
    )}%2F${encodeURIComponent(type)}-${date}.${ext}`
  );
  const { url, fields } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  // Upload file to AWS
  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (upload.ok) {
    console.log("Uploaded successfully!");
    return createFileUrl(file, userId, type, date);
  } else {
    toast.error("Upload failed");
    console.error("Upload failed.");
  }
};

export const createFileUrl = (
  file: any,
  userId: string,
  type: uploadType,
  date: number
) => {
  const regex = /image\/(jpeg|png|gif)/;
  const ext = file.type.match(regex)[1];

  const filename = `${userId}/${type}-${date}`;
  const bucketname = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_S3_REGION;
  const fileUrl =
    "//" +
    bucketname +
    ".s3." +
    region +
    ".amazonaws.com/" +
    filename +
    "." +
    ext;
  return fileUrl;
};
