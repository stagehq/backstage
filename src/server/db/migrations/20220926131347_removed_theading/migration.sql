/*
  Warnings:

  - You are about to drop the `IdeaComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IdeaCommentAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IdeaComment" DROP CONSTRAINT "IdeaComment_ideaId_fkey";

-- DropForeignKey
ALTER TABLE "IdeaComment" DROP CONSTRAINT "IdeaComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "IdeaCommentAnswer" DROP CONSTRAINT "IdeaCommentAnswer_ideaCommentId_fkey";

-- DropForeignKey
ALTER TABLE "IdeaCommentAnswer" DROP CONSTRAINT "IdeaCommentAnswer_userId_fkey";

-- DropTable
DROP TABLE "IdeaComment";

-- DropTable
DROP TABLE "IdeaCommentAnswer";
