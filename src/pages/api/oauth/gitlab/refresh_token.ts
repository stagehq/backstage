// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { refreshToken, grantType } = req.body;

  const response = await fetch("https://gitlab.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID,
      client_secret: process.env.GITLAB_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: grantType,
    }),
  }).then((response) => response.json());

  res.status(200).json({ gitlab: response });
};
