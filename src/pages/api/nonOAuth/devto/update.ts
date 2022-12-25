// nextjs api route for linkedin

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, preferences } = await JSON.parse(req.body);

  const username = preferences.find(
    (x: { key: string; value: string }) => x.key === "username"
  ).value;

  //fetch dev.to profile data with this url https://dev.to/api/articles and store in data
  const params = new URLSearchParams({
    username: `${username}`,
  });

  const url = "https://dev.to/api/articles" + route + "?" + params;
  console.log(url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.PROXYCURL_TOKEN,
    },
  }).then((response) => response.json());

  if (response.status === 401) {
    res.status(401).json({ error: "The token is not correct." });
  } else {
    res.status(200).json(response);
  }
};
