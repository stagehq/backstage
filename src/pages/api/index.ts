import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import handler from "../../server/api-route";
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

export default handler().use((req: MicroRequest, res: ServerResponse) => {
  startServer.then(() => {
    apolloServer.createHandler({
      path: "/api",
    })(req, res);
  });
});
