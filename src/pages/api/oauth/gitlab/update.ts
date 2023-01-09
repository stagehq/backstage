// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { route, token, preferences } = await JSON.parse(req.body);

    console.log("route", route);

    const response = await wretch("https://gitlab.com" + route)
      .headers({
        Accept: "application/json",
        test: `Bearer ${token}`,
      })
      .get()
      .json();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
