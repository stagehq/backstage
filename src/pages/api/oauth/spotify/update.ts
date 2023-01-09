// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { route, token } = req.body;

    const response = await wretch(`https://api.spotify.com${route}`)
      .headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      })
      .get()
      .json();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
