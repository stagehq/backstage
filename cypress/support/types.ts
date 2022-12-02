// We need to use a namespace to merge our custom commands types into cypress
// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to authenticate a user.
     * @example cy.auth(user.id)
     */
    auth(userId: string): Chainable<void>;
  }
}
