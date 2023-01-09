import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";

const addSubscriber = async (email: string) => {
  const data = {
    members: [
      {
        email_address: email,
        status: "pending",
      },
    ],
  };

  const url =
    "https://us17.api.mailchimp.com/3.0/lists/" + process.env.MAILCHIMP_ID;

  await wretch(url)
    .headers({
      "Content-Type": "application/json",
      Authorization: "Basic " + process.env.MAILCHIMP_API_KEY,
    })
    .post(JSON.stringify(data))
    .json();
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await addSubscriber(req.body.email);
  res.status(200).json({});
};
