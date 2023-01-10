// nextjs api route for linkedin

import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, preferences } = req.body;

  const {value} = preferences[0];
  const username = value;

  //fetch dev.to profile data with this url https://dev.to/api/articles and store in data
  const params = new URLSearchParams({
    username: `${username}`,
  });

  const url = "https://dev.to/api/articles" + route + "?" + params;
  console.log(url);

  try {
    const response = await wretch(url)
      .headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.PROXYCURL_TOKEN,
      })
      .get()
      .json();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
