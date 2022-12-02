/*
  Warnings:

  - You are about to drop the column `votes` on the `Idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "votes",
ALTER COLUMN "reactions" SET DEFAULT ARRAY[]::TEXT[];
