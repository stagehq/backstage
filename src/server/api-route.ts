import { NextApiRequest, NextApiResponse } from "next";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import nc from "next-connect";
import { error } from "next/dist/build/output/log";
import { trustProxyMiddleware } from "./trust-proxy-middleware";

export interface Request extends NextApiRequest {
  user?: Session | null;
  protocol: string;
}

const COOKIE_SECRET = process.env.COOKIE_SECRET;

/**
 * Create an API route handler with next-connect and all the necessary middlewares
 *
 * @example
 * ```ts
 * export default handler().get((req, res) => { ... })
 * ```
 */
function handler() {
  if (!COOKIE_SECRET)
    throw new Error(`Please add COOKIE_SECRET to your .env.local file!`);

  return (
    nc<Request, NextApiResponse>({
      onError: (err, _, res) => {
        error(err);
        res.status(500).end(err.toString());
      },
    })
      // In order for authentication to work on Vercel, req.protocol needs to be set correctly.
      // However, Vercel's and Netlify's reverse proxy setup breaks req.protocol, which the custom
      // trustProxyMiddleware fixes again.
      .use(trustProxyMiddleware)
      .use(async (req: Request, res: NextApiResponse, next) => {
        const session = await getSession({ req });
        console.log(session);
        
        req.user = session;
        if (session) {
          // Signed in
          next();
        } else {
          // Not Signed in
          console.log("Not signed in");
          res.status(401).end();
        }
      })
  );
}

export default handler;
