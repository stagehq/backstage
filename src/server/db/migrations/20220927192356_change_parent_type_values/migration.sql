/*
  Warnings:

  - The values [Idea,Comment] on the enum `ParentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ParentType_new" AS ENUM ('idea', 'comment');
ALTER TABLE "Reaction" ALTER COLUMN "parentType" DROP DEFAULT;
ALTER TABLE "Comment" ALTER COLUMN "parentType" DROP DEFAULT;
ALTER TABLE "Comment" ALTER COLUMN "parentType" TYPE "ParentType_new" USING ("parentType"::text::"ParentType_new");
ALTER TABLE "Reaction" ALTER COLUMN "parentType" TYPE "ParentType_new" USING ("parentType"::text::"ParentType_new");
ALTER TYPE "ParentType" RENAME TO "ParentType_old";
ALTER TYPE "ParentType_new" RENAME TO "ParentType";
DROP TYPE "ParentType_old";
ALTER TABLE "Reaction" ALTER COLUMN "parentType" SET DEFAULT 'idea';
ALTER TABLE "Comment" ALTER COLUMN "parentType" SET DEFAULT 'idea';
COMMIT;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "parentType" SET DEFAULT 'idea';

-- AlterTable
ALTER TABLE "Reaction" ALTER COLUMN "parentType" SET DEFAULT 'idea';
