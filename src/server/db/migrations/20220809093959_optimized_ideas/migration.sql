/*
  Warnings:

  - You are about to drop the column `ideaContentReactionId` on the `IdeaContent` table. All the data in the column will be lost.
  - You are about to drop the column `ideaId` on the `Label` table. All the data in the column will be lost.
  - You are about to drop the `IdeaContentReaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `statusMeeting` to the `Idea` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IdeaContent" DROP CONSTRAINT "IdeaContent_ideaContentReactionId_fkey";

-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_ideaId_fkey";

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "reactions" TEXT[],
ADD COLUMN     "statusMeeting" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "IdeaContent" DROP COLUMN "ideaContentReactionId";

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "ideaId",
ADD COLUMN     "projectId" TEXT;

-- DropTable
DROP TABLE "IdeaContentReaction";

-- CreateTable
CREATE TABLE "_IdeaToLabel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IdeaToLabel_AB_unique" ON "_IdeaToLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_IdeaToLabel_B_index" ON "_IdeaToLabel"("B");

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdeaToLabel" ADD CONSTRAINT "_IdeaToLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdeaToLabel" ADD CONSTRAINT "_IdeaToLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;
