import { render } from '@react-email/render';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import NextAuth, { Account, AuthOptions, Profile, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GitlabProvider from "next-auth/providers/gitlab";
import GoogleProvider from "next-auth/providers/google";
import { createTransport } from "nodemailer";
import { getInvite } from "../../../helper/invites/airtable";
import prisma from "../../../server/db/prisma";
import Email from './Email';

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // async sendVerificationRequest(params) {
      //   const { identifier, url, provider } = params
      //   const { host } = new URL(url);

      //   const transport = createTransport(provider.server);
      //   const email = render(<Email magicLink={url} />);
        
      //   const result = await transport.sendMail({
      //     to: identifier,
      //     from: provider.from,
      //     subject: `Sign in to ${host}`,
      //     html: email,
      //   });
        
      //   const failed = result.rejected.concat(result.pending).filter(Boolean)
      //   if (failed.length) {
      //     throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
      //   }
      // }
    }),
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET as string,
    }),
    GitlabProvider({
      clientId: process.env.NEXTAUTH_GITLAB_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GITLAB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(params) {
      const {
        user,
        account,
        profile,
      }: { user: User; account: Account | null; profile?: Profile } = params;
      if (!user.email) return false;

      // Check if the user is allowed to sign in
      const invite = await getInvite(user.email);
      // Check if invite exists
      if (!invite) return false;
      // Check if invite is allowed to sign in
      const isAllowedToSignIn = invite.invited;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};