import { URLSearchParams } from "url";
// nextjs api route for spotify

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authCode, codeVerifier, redirectURI } = req.body;

  const data = new URLSearchParams();
  data.append(
    "client_id",
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
      ? process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
      : ""
  );
  data.append("code", authCode);
  data.append("code_verifier", codeVerifier);
  data.append("grant_type", "authorization_code");
  data.append("redirect_uri", redirectURI);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: data,
  }).then((response) => response.json());

  res.status(200).json(response);
};
