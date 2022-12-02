import jwt from "jsonwebtoken";

const SECRET = process.env.INVITATION_TOKEN_SECRET;

if (!SECRET)
  throw new Error("Please specify the INVITATION_TOKEN_SECRET env variable.");

type JwtPayload = {
  destination: string;
  projectId: string;
};

/**
 * Decode an invitation token
 *
 * @example
 * ```ts
 * const { projectId } = decodeToken(req.query.token)
 * ```
 */
export const decodeInvitationToken = (token: string): JwtPayload | null => {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
};

/**
 * Generate an invitation token
 *
 * @example
 * ```ts
 * const token = generateToken({
 *   destination: user.email,
 *   projectId: project.id
 * })
 * ```
 */
export const generateInvitationToken = (payload: JwtPayload): string =>
  jwt.sign(payload, SECRET, {
    expiresIn: "1w",
  });
