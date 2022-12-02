/*
  Warnings:

  - Added the required column `description` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "description" TEXT NOT NULL;
