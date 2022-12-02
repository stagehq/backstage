import { NextApiRequest, NextApiResponse } from "next";

import aws from "aws-sdk";
import nc from "next-connect";
import { error } from "next/dist/build/output/log";

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY,
  region: process.env.S3_REGION,
  signatureVersion: "v4",
});

export const s3 = new aws.S3();

export const s3handler = () => {
  return nc<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
    onError: (err, _, res) => {
      error(err);
      res.status(500).end(err.toString());
    },
  });
};

export default s3handler;
