/*
  Warnings:

  - You are about to drop the column `alias` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_alias_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "alias",
ADD COLUMN     "name" TEXT;
