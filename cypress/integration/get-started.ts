describe("get-started", () => {
  it("should sign up", () => {
    cy.visit(`/get-started`);
    cy.get('input[type="email"]').type(`contact@mxstbr.com{enter}`);
    cy.url().should("include", "check-mailbox");
  });
});
