/// <reference types="cypress" />
import { reseedDatabase, SeedData } from "../../src/test/seed";

const plugins: Cypress.PluginConfig = (on) => {
  on("task", {
    // Re-seed the database (delete all data & insert fresh)
    async reseed(data?: SeedData) {
      await reseedDatabase(data);
      return null;
    },
  });
};

module.exports = plugins;
