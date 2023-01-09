// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authCode, codeVerifier, redirectURI } = req.body;

    const response = await wretch("https://gitlab.com/oauth/token")
      .post({
        client_id: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID,
        client_secret: process.env.GITLAB_CLIENT_SECRET,
        code: authCode,
        code_verifier: codeVerifier,
        grant_type: "authorization_code",
        redirect_uri: redirectURI,
      })
      .json();

    res.status(200).json({ medium: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
