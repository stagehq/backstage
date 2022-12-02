/*
  Warnings:

  - You are about to drop the column `comment` on the `IdeaCommentAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IdeaCommentAnswer" DROP COLUMN "comment",
ADD COLUMN     "content" TEXT;
