// Global setup for Jest, will run once per test file
import prisma from "../server/db/prisma";
// import { reseedDatabase } from "./seed";

beforeEach(async () => {
  // await reseedDatabase();
});

afterAll(() => {
  // Disconnect Prisma from the database after all tests are complete
  // to avoid open handles stopping Jest from exiting
  prisma.$disconnect();
});
