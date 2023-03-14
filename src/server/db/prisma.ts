import { PrismaClient } from "@prisma/client";
import { fieldEncryptionMiddleware } from "prisma-field-encryption";

// Make global.cachedPrisma work with TypeScript
declare global {
  // NOTE: This actually needs to be a "var", let/const don't work here.
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

// Workaround to make Prisma Client work well during "next dev"
// @see https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
let prisma: PrismaClient;
if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

prisma.$use(
  fieldEncryptionMiddleware({
    encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
  })
);

export default prisma;
