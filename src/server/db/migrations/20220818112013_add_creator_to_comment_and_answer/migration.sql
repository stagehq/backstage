/*
  Warnings:

  - Made the column `userId` on table `IdeaCommentAnswer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "IdeaCommentAnswer" DROP CONSTRAINT "IdeaCommentAnswer_userId_fkey";

-- AlterTable
ALTER TABLE "IdeaComment" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IdeaCommentAnswer" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "IdeaComment" ADD CONSTRAINT "IdeaComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaCommentAnswer" ADD CONSTRAINT "IdeaCommentAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
