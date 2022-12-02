import { testData } from "../../src/test/seed/data";

describe("Dashboard", () => {
  it("should redirect to /login for unauthenticated users", () => {
    cy.visit(`/app`);
    cy.url().should("include", "login");
  });

  it("should show the dashboard for authenticated users", () => {
    const userId = testData.users[0].id;
    const project = testData.projects.find((project) =>
      project.users.includes(userId)
    );

    cy.auth(userId);
    cy.visit("/app");
    cy.contains("Hello Tester").should("be.visible");
    cy.contains(project.name).should("be.visible");
  });
});
