// nextjs api route for spotify
import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";
import FormUrlAddon from "wretch/addons/formUrl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authCode, codeVerifier, redirectURI } = req.body;

    const response = await wretch(
      "https://stackoverflow.com/oauth/access_token"
    )
      .addon(FormUrlAddon)
      .headers({
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .formUrl({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
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
