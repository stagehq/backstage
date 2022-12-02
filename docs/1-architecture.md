# Architecture

The tools you will interact with most frequently when using Bedrock are:

1. **[Next.js](https://nextjs.org) as the base framework** to render pages with React
1. **[Prisma](https://prisma.io) as the ORM** to manage the database and migrations
1. **[Nexus](https://nexusjs.org) to build the GraphQL schema** code-first
1. **[GraphQL Codegen](https://www.graphql-code-generator.com/) with [urql](https://formidable.com/open-source/urql/)** to fetch data on the client

I would recommend having basic familiarity with these tools before trying to use Bedrock. If you're unfamiliar with any of them, read their "intro" or "basic" documentation to get an overview of how they work!

## General workflow

In general, the workflow for adding new data types and exposing them via GraphQL is:

1. **Add to the database schema**: Add the new model to the Prisma schema in `src/server/db/schema.prisma`. For the sake of this explanation, let's use a `Post` as an example:

```prisma
model Post {
  // These are fields you should likely always store
  id         String   @id @default(cuid())
  createdAt  DateTime @default(now())
  modifiedAt  DateTime @default(now())

  // These are our custom fields
  title      String
  body       String?
}
```

2. **Add a GraphQL object type**: Add a file to `src/server/graphql/<ModelName>/index.ts` with a basic [Nexus `objectType`](https://nexusjs.org/docs/api/object-type) definition for it. You would likely also [`extendType`](https://nexusjs.org/docs/api/extend-type) the root Query to add some queries for it. In our case, this would look something like:

```ts
// src/server/graphql/Post/index.ts
import { objectType, extendType, nonNull, stringArg } from "nexus";
import prisma from "../../db/prisma";

const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.string("body");

    // To add DateTime scalar support, follow https://nexusjs.org/docs/plugins/prisma/removing-the-nexus-plugin-prisma#datetime
    t.nonNull.field("createdAt", { type: "DateTime" });

    // Note how we can decide which fields to expose. In this example, I purposefully did not expose `t.nonNull.field("modifiedAt", { type: "DateTime" })`!
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    // This will add a { post(id: "...") { id title body } } query to the API
    t.field("post", {
      type: "Post",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, { id }, ctx) => {
        // Only let authenticated users fetch posts
        if (!ctx.user?.id) return null;

        return prisma.post.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});

// ⚠️ Note: export an array with both the Post objectType and the extendType queries! ⚠️
// If you don't export one of them, they won't show up in the API.
export default [Post, queries];
```

3. **Add the object type to the GraphQL schema**: Importing your new object type in `src/server/graphql/schema.ts` and add it to the `types` array:

```ts
import Post from "./Post";
export const schema = makeSchema({
  types: [User, Project, PaidPlan, Post],
  // ...
});
```

4. **Write frontend queries**: You can now start writing queries for the frontend in `src/client/graphql/`! In our example, let's add a `getPost` query in a separate `.graphql` file:

```graphql
# src/client/graphql/getPost.graphql
query getPost($id: String!) {
  post(id: $id) {
    id
    createdAt
    title
    body
  }
}
```

5. **Generate all the things**: Run `yarn run generate` to update Prisma client, update the `schema.graphql` file and (most importantly) generate urql frontend querying hooks!

6. **Fetch data from your UI**: You have now successfully added a new model to your database, exposed the model and a query for it from your GraphQL API and generated frontend querying hooks for it. 🎉 You can now implement your UI, which would look something like this:

```tsx
// src/pages/post/[id].tsx
import { useRouter } from "next/router";
// Import the generated React hook for fetching a post
import { useGetPostQuery } from "../../../client/graphql/getPost.generated";

export default function Post() {
  // Get the ID of the post from the URL
  const router = useRouter();
  const { id } = router.query;

  // Fetch the post!
  const [{ data, fetching, error }] = useGetPostQuery({
    variables: {
      id: id,
    },
  });

  return <div>{/* ...render your post here... */}</div>;
}
```
