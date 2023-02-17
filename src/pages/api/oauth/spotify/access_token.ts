import wretch from "wretch";
import FormUrlAddon from "wretch/addons/formUrl";
// nextjs api route for spotify

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authCode, codeVerifier, redirectURI } = req.body;

    const response = await wretch("https://accounts.spotify.com/api/token")
      .addon(FormUrlAddon)
      .auth(
        `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`
      )
      .headers({
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .formUrl({
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: redirectURI,
        code_verifier: codeVerifier,
      })
      .post()
      .json();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
