// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/db/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, token } = req.body;

  const response = await fetch("https://gitlab.com/" + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

  res.status(200).json(response);


};
