/*
  Warnings:

  - You are about to drop the `IdeaContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IdeaContentComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IdeaContent" DROP CONSTRAINT "IdeaContent_ideaId_fkey";

-- DropForeignKey
ALTER TABLE "IdeaContentComment" DROP CONSTRAINT "IdeaContentComment_ideaContentId_fkey";

-- DropForeignKey
ALTER TABLE "IdeaContentComment" DROP CONSTRAINT "IdeaContentComment_userId_fkey";

-- DropTable
DROP TABLE "IdeaContent";

-- DropTable
DROP TABLE "IdeaContentComment";

-- CreateTable
CREATE TABLE "IdeaComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "ideaId" TEXT,

    CONSTRAINT "IdeaComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdeaCommentAnswer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "userId" TEXT,
    "ideaCommentId" TEXT,

    CONSTRAINT "IdeaCommentAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IdeaComment" ADD CONSTRAINT "IdeaComment_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaCommentAnswer" ADD CONSTRAINT "IdeaCommentAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaCommentAnswer" ADD CONSTRAINT "IdeaCommentAnswer_ideaCommentId_fkey" FOREIGN KEY ("ideaCommentId") REFERENCES "IdeaComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
