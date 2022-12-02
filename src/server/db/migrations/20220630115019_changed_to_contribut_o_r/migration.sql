/*
  Warnings:

  - The values [contributer] on the enum `ProjectRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectRole_new" AS ENUM ('owner', 'contributor', 'core');
ALTER TABLE "UserProjectRelation" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "UserProjectRelation" ALTER COLUMN "role" TYPE "ProjectRole_new" USING ("role"::text::"ProjectRole_new");
ALTER TYPE "ProjectRole" RENAME TO "ProjectRole_old";
ALTER TYPE "ProjectRole_new" RENAME TO "ProjectRole";
DROP TYPE "ProjectRole_old";
ALTER TABLE "UserProjectRelation" ALTER COLUMN "role" SET DEFAULT 'contributor';
COMMIT;

-- AlterTable
ALTER TABLE "UserProjectRelation" ALTER COLUMN "role" SET DEFAULT E'contributor';
