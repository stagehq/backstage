/*
  Warnings:

  - You are about to drop the column `description` on the `Idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "IdeaContentComment" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "IdeaContentComment" ADD CONSTRAINT "IdeaContentComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
