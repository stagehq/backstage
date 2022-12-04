import { ServerResponse } from 'http';
import { authOptions } from '@/lib/auth';
import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { unstable_getServerSession } from 'next-auth';
import { schema } from "../../server/graphql/schema";
import { getRequestOrigin } from "./../../server/get-request-origin";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface GraphQLContext {
  session: {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: Date; // This is the expiry of the session, not any of the tokens within the session
  };
  origin: string;
}

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }): GraphQLContext => ({
    session: req.user,
    origin: getRequestOrigin(req),
  }),
});

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  startServer.then(() => {
    apolloServer.createHandler({
      path: "/api",
    })(req, res);
  });
};
