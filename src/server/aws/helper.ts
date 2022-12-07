// Upload files to aws

import { uploadType } from "../../client/components/Dropzone";

export const uploadFile = async (
  file: any,
  userId: string,
  type: uploadType
) => {
  if (!file) return;
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(file.name)?.[1];
  const date = Date.now();

  // Get presigned post call
  const res = await fetch(
    `/api/aws/upload-url?file=${encodeURIComponent(
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
    console.error("Upload failed.");
  }
};

export const createFileUrl = (
  file: any,
  userId: string,
  type: uploadType,
  date: number
) => {
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(file.name)?.[1];

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
