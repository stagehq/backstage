import { NextApiResponse } from "next";
import { Middleware } from "next-connect";
import { Request } from "./api-route";

/**
 * This trustProxyMiddleware replicates Express' app.set("trust proxy", true) to make auth work on Vercel. (inspired by blitz-js/blitz#966)
 */
export const trustProxyMiddleware: Middleware<Request, NextApiResponse> =
  function (req, _, next) {
    req.protocol = getProtocol(req);
    next();
  };

function getProtocol(req: Request) {
  // @ts-ignore the types for req.connection are incorrect
  if (req.secure) {
    return "https";
  }

  const forwardedProto =
    req.headers && (req.headers["x-forwarded-proto"] as string);
  if (forwardedProto) {
    return forwardedProto.split(/\s*,\s*/)[0];
  }

  return "http";
}
