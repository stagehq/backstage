# Overview

Bedrock is a standard [Next.js](https://nextjs.org) app with heavy usage of [file-system routing](https://nextjs.org/docs/routing/introduction) and [API routes](https://nextjs.org/docs/api-routes/introduction).

## Folder structure

```sh
bedrock
│   # CI configuration (GitHub Actions)
├── .github
│   # VSCode configuration (recommended extensions)
├── .vscode
│   # End-to-end tests
├── cypress
│   # Public files (e.g. favicon, meta images)
├── public
│   # The source code of your app, this is where you'll spend most of your time!
└── src
    │   # All client-side code like components and GraphQL queries
    ├── client
    │   ├── components
    │   │   ├── AuthenticationForm
    │   │   ├── Footer
    │   │   ├── Layout
    │   │   ├── Navbar
    │   │   └── UpgradeButton
    │   └── graphql
    │   # The pages of your app
    ├── pages
    │   │   # API routes
    │   └── api
    │       ├── auth
    │       │   └── magiclink
    │       ├── invitations
    │       └── stripe
    │   # All server-side code
    ├── server
    │   │   # Database schema & migrations
    │   ├── db
    │   │   # GraphQL schema
    │   ├── graphql
    │   │   │   # Each individual object type has its own folder
    │   │   ├── Project
    │   │   └── User
    │   ├── invitations
    │   ├── passport
    │   └── stripe
    │   # Test utilities used in server/**/*.test.ts
    └── test
        └── seed
```

Bedrock explicitly separates client-side code from server-side code, as the pages folder tends to make it too easy to use and thus expose potentially sensitive server-side code (e.g. with secrets) on the client.

## API routes

To consistently manage the middlewares for API routes (e.g. authentication) Bedrock has a small abstraction on top of [next-connect](https://github.com/hoangvvo/next-connect) in `src/server/api-route.ts`.

Here is an example of a simplistic API route:

```TS
// src/pages/api/route.ts
import handler from "../../server/api-route";

export default handler().get(async (req, res) => {
  if (!req.user) {
    res
      .status(403)
      .send(`Unauthorized. Authenticate at /login please.`)
    return
  }

  res.send(`Hello ${req.user.name}!`)
})
```

The exported `handler()` function returns an instance of next-connect with attached authentication middlewares — that's why the `req` has the `req.user` property (if the user is authenticated).
