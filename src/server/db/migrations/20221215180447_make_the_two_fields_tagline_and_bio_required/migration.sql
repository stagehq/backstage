/*
  Warnings:

  - Made the column `bio` on table `Site` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagline` on table `Site` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "tagline" SET NOT NULL;
