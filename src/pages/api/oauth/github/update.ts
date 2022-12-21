// nextjs api route for github

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, token, preferences } = await JSON.parse(req.body);

  const response = await fetch("https://api.github.com" + route, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  }).then((response) => response.json());

  console.log(response);

  res.status(200).json(response);
};
