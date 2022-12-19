// nextjs api route for github

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authCode, codeVerifier, redirectURI } = req.body;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: authCode,
      code_verifier: codeVerifier,
      grant_type: "authorization_code",
      redirect_uri: redirectURI,
    }),
  }).then((response) => response.json());

  res.status(200).json({ github: response });
};
