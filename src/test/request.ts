import { oneLine } from "common-tags";
import { graphql as executeGraphQL, GraphQLArgs, Source } from "graphql";
import { schema } from "../server/graphql/schema";

interface Options {
  context?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any;
  };
  variables?: Record<string, unknown>;
}

/**
 * Execute a GraphQL query for unit testing
 *
 * @example
 * ```ts
 * expect(await request(graphql`{ currentUser { id } }`)).toMatchSnapshot()
 * ```
 * ```ts
 * // To authenticate a user:
 * expect(await request(graphql`{ currentUser { id } }`, {
 *   context: {
 *     user: testData.users[0]
 *   }
 * })).toMatchSnapshot()
 * ```
 */

export const request = (
  query: string | Source,
  { context, variables }: Options = {}
) => {
  const graphqlArgs: GraphQLArgs = {
    schema,
    source: query,
    contextValue: context || {},
    variableValues: variables || {},
  };

  return executeGraphQL(graphqlArgs);
};

/**
 * No-op graphql tagged template literal for tests to trigger Prettier's code formatted and VSCode's syntax highlighting
 * @example
 * ```ts
 * expect(await request(graphql`{ currentUser { id } }`)).toMatchSnapshot()
 * ```
 */
export const graphql = oneLine;
