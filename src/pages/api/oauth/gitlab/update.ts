// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, token, preferences } = await JSON.parse(req.body);

  console.log("route", route);

  const response = await fetch("https://gitlab.com" + route, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "test": `Bearer ${token}`,
    },
  }).then((response) => response.json());

  console.log(response);

  if (response.status === 401) {
    res.status(401).json({ error: "The token is not correct." });
  } else {
    res.status(200).json(response);
  }
};
