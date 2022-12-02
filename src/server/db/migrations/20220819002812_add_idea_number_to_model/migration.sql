/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Idea_number_key" ON "Idea"("number");
