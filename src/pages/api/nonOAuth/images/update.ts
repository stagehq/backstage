// nextjs api route for images

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, preferences } = req.body;

  const { value } = preferences[0];
  const path = value;
  console.log(path);

  try {
    const response = {
      path: path,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
