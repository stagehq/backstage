import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const data = {
    members: [
      {
        email_address: req.body.email,
        status: "pending",
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url =
    "https://us17.api.mailchimp.com/3.0/lists/" + process.env.MAILCHIMP_ID;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + process.env.MAILCHIMP_API_KEY,
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors[0]) {
        throw "error";
      } else {
        res.status(200).json({});
      }
    })
    .catch(() => {
      res.status(400).json({});
    });
};
