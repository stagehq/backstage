// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authCode, codeVerifier, redirectURI } = req.body;

  const response = await fetch("https://gitlab.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID,
      client_secret: process.env.GITLAB_CLIENT_SECRET,
      code: authCode,
      code_verifier: codeVerifier,
      grant_type: "authorization_code",
      redirect_uri: redirectURI,
    }),
  }).then((response) => response.json());

  res.status(200).json(response);
};
