// nextjs api route for github
import { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";
import queryString from 'query-string';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authCode, codeVerifier, redirectURI } = req.body;

    const response = await wretch("https://github.com/login/oauth/access_token")
      .post({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: authCode,
        code_verifier: codeVerifier,
        grant_type: "authorization_code",
        redirect_uri: redirectURI,
      })
      .text((text) => {
        return queryString.parse(text);
      });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
