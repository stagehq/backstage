# Backstage 🕺

### Setup

#### Optional

You'll need certain environment variables to run Bedrock's functionality in local development. The first step is to:

- Sign up for [Stripe](https://stripe.com), used for payments
- Sign up for [Postmark](https://postmarkapp.com), used for sending emails

#### Steps

Copy `.env.example` to `.env` and fill out the `.env` file with your environment variables!

```sh
cp .env.example .env
```

> Note: do not delete the `.env.example` file, as it's used by some code generation processes and is useful for potential future team members as a reference.

Now you're ready to set everything up locally:

1. **Install Docker** by following their [installation instructions for your OS](https://docs.docker.com/get-docker/). Backstage uses Docker to start the local development database.

2. Then, **install the dependencies** with `yarn`:

```sh
yarn
```

3. **Start the local development database** as well as the Stripe CLI webhook listener (to make payments work) with `docker-compose`:

```sh
docker-compose up
```

4. **Copy the webhook secret** that the Stripe CLI logged, something like "> Ready! Your webhook signing secret is whsec\_\*\*\*". Copy that secret and add it to your `.env` file.

5. **Migrate your local development database** to the base schema:

```sh
yarn prisma:migrate
```

### Development workflow

To develop your app, you always need to have two commands running concurrently:

1. **Start the development database** with:

```sh
docker-compose up
```

2. **Start the development process**, which also runs all the necessary code generators:

```sh
yarn dev
```

That's it! Now you should have Backstage running locally and should be able to visit http://localhost:3000 🎉

#### Scripts

The **three most important commands** you'll run frequently during development:

- `yarn generate`: Generates the Prisma client ([docs](https://www.prisma.io/docs/concepts/components/prisma-client)), which Nexus uses and generates the GraphQL schema ([docs](https://nexusjs.org/docs/guides/generated-artifacts)), which GraphQL Codegen uses and generates the urql hooks ([docs](https://graphql-code-generator.com/docs/plugins/typescript-urql)). Run this whenever you change the database schema, GraphQL schema or GraphQL queries.

- `yarn prisma:migrate`: Creates migration files from your Prisma schema changes and runs those migrations on your local dev db ([docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)). Run this whenever you change your database schema.

- `yarn prisma:studio`: Starts [Prisma Studio](https://prisma.io/studio) on `localhost:5555` where you can inspect your local development database.

- `yarn cypress:open`: Opens Cypress so you can write and run your end-to-end tests. ([docs](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Adding-npm-scripts))

All the others are used in CI or by those three main scripts, but you should only rarely need to run them manually.

---

For more information, check out [the in-depth docs](./docs/README.md)
