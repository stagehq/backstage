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

describe(`updateUser`, () => {
  it(`should update the user's name`, async () => {
    // Right name initially
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

    // Update name
    expect(
      await request(
        graphql`
          mutation updateUser($userId: String!) {
            updateUser(userId: $userId, name: "New name") {
              id
              name
            }
          }
        `,
        {
          context: {
            user: testData.users[0],
          },
          variables: {
            userId: testData.users[0].id,
          },
        }
      )
    ).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "updateUser": Object {
            "id": "test",
            "name": "New name",
          },
        },
      }
    `);

    // Updated name
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
            "name": "New name",
          },
        },
      }
    `);
  });
});
