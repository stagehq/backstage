import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";
import FormUrlAddon from "wretch/addons/formUrl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { refreshToken, grantType } = req.body;

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
        grant_type: grantType,
        refresh_token: refreshToken,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      })
      .post()
      .json();

    res.status(200).json(response);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error });
  }
};
