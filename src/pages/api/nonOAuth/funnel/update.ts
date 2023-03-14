// nextjs api route for funnel

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, preferences } = req.body;

  const { value } = preferences[0];
  const email = "mailto:" + value;

  try {
    const response = {
      email: email,
    };
    res.status(200).json(response);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error });
  }
};
