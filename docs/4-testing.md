# Testing

At Spectrum and GitHub, I quickly realised that unit tests are an utter waste of time when you're building a product. They're only useful for verifying implementation details, which shouldn't matter at all.

The only thing that matters when building a product is **that the app works for your users**. That's it. Everything else is irrelevant.

We had over 600 end-to-end tests at Spectrum for every feature of the app and they saved our butts more times than I can count!

That's why Bedrock ships with a really nice end-to-end testing and an (optional) API integration testing setup: they ensure the app and (if you want users to use it directly) the API work as they should.

Commonly, people associate end-to-end tests as being slow and flakey, but [Cypress](https://cypress.io) has solved those problems entirely. Our 600 end-to-end tests ran in ~6 minutes flat on CI!

## End-to-end tests

You write end-to-end tests with [Cypress](https://cypress.io). Bedrock also already adds support for authentication and a really nice database seeding setup. This is what a typical end-to-end test looks like:

```ts
import { testData } from "../../src/test/seed/data";

describe("Dashboard", () => {
  it("should redirect to /login for unauthenticated users", () => {
    // By default, no user is authenticated
    cy.visit(`/app`);
    cy.url().should("include", "login");
  });

  it("should show the dashboard for authenticated users", () => {
    const userId = testData.users[0].id;
    const project = testData.projects.find((project) =>
      project.users.includes(userId)
    );

    // Authenticate a user with the custom cy.auth(userId) command
    cy.auth(userId);

    // Visit the authenticated user dashboard
    cy.visit("/app");
    cy.contains("Hello Tester").should("be.visible");
    cy.contains(project.name).should("be.visible");
  });
});
```

Before every test, the seed data will be reset, so even if you change something during your test, it won't affect any other test!

To add new data to the seed used during testing, edit the `src/test/seed/data.ts` file. I would recommend creating individual users for specific edge cases with specific custom IDs, for example:

```ts
export const testData: SeedData = {
  users: [
    {
      id: "two-projects",
      name: "Two projects",
      email: "test@test.com",
    },
  ],
  projects: [
    {
      id: "one",
      name: "First Project",
      slug: "first",
      users: ["two-projects"],
    },
    {
      id: "two",
      name: "Second Project",
      slug: "second",
      users: ["two-projects"],
    },
  ],
};
```

Now you can use that `two-projects` user in your end-to-end tests to verify that the right thing happens when a user is a member of two projects:

```ts
import { testData } from "../../src/test/seed/data";

it("should handle a user being a member of two projects", () => {
  const userId = "two-projects";
  const projects = testData.projects.filter((project) =>
    project.users.includes(userId)
  );

  cy.auth(userId);

  cy.visit("/app");
  cy.contains(projects[0].name).should("be.visible");
  cy.contains(projects[1].name).should("be.visible");
});
```

## API integration tests

You run API integration tests with the `yarn test` command, which uses [Jest](https://jestjs.io) as the test runner. API integration tests use the same seed data and mechanism as end-to-end tests.

Bedrock also has a small abstraction over graphql to query the GraphQL schema without spinning up a server for it in `src/test/request.ts` which is much faster.

For example, here is what a typical API integration test looks like:

```js
import { testData } from "../../../test/seed/data";
import { request, graphql } from "../../../test/request";

describe(`currentUser`, () => {
  it(`should return null when unauthenticated`, async () => {
    expect(
      await request(
        graphql`
          {
            currentUser {
              id
            }
          }
        `
      )
    ).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "currentUser": null,
          },
        }
    `);
  });

  it(`should return the current user data when authenticated`, async () => {
    expect(
      await request(
        graphql`
          {
            currentUser {
              id
              name
            }
          }
        `,
        {
          context: {
            user: testData.users[0],
          },
        }
      )
    ).toMatchInlineSnapshot(`
          Object {
            "data": Object {
              "currentUser": Object {
                "id": "test",
                "name": "Tester",
              },
            },
          }
      `);
  });
});
```
