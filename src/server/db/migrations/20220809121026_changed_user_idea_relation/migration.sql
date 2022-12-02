/*
  Warnings:

  - You are about to drop the column `participantInIdeaId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_participantInIdeaId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "participantInIdeaId";

-- CreateTable
CREATE TABLE "_participantInIdea" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_participantInIdea_AB_unique" ON "_participantInIdea"("A", "B");

-- CreateIndex
CREATE INDEX "_participantInIdea_B_index" ON "_participantInIdea"("B");

-- AddForeignKey
ALTER TABLE "_participantInIdea" ADD CONSTRAINT "_participantInIdea_A_fkey" FOREIGN KEY ("A") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participantInIdea" ADD CONSTRAINT "_participantInIdea_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
