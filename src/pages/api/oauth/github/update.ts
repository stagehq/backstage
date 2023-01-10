import wretch from "wretch";
// nextjs api route for github

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { route, token, preferences } = req.body;

    const response = await wretch(`https://api.github.com${route}`)
      .auth(`Bearer ${token}`)
      .headers({
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      })
      .get()
      .json();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
