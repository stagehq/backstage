beforeEach(() => {
  // Reset the db with the default seed data before each test
  cy.task("reseed");
});

// @ts-expect-error
Cypress.Commands.add("auth", (userId) => {
  return cy.setCookie(
    "session",
    btoa(JSON.stringify({ passport: { user: { id: userId } } })),
    {
      httpOnly: true,
      secure: false,
    }
  );
});
