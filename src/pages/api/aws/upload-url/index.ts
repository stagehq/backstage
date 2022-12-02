import { s3, s3handler } from "../../../../server/aws/handler";

// Get a pre-signed POST policy to support uploading to S3 directly from an HTML form.

export default s3handler().get((req, res) => {
  const post = s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET_NAME,
    Fields: {
      key: req.query.file,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 20971520], // up to 5 MB
    ],
  });

  res.status(200).json(post);
});
