import { URLSearchParams } from "url";
import wretch from "wretch";
import FormUrlAddon from "wretch/addons/formUrl";
// nextjs api route for spotify

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authCode, codeVerifier, redirectURI } = req.body;

    const data = new URLSearchParams();
    // data.append("grant_type", "client_credentials");
    data.append("code", authCode);
    data.append("code_verifier", codeVerifier);
    data.append("redirect_uri", redirectURI);
    data.append(
      "client_id",
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
        ? process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
        : ""
    );

    const response = await wretch(
      "https://accounts.spotify.com/api/token?grant_type=client_credentials"
    )
      .addon(FormUrlAddon)
      .headers({
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .auth(
        `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`
      )
      .formUrl(data)
      .post()
      .json();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
