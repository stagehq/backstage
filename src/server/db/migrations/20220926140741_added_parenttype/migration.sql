-- CreateEnum
CREATE TYPE "ParentType" AS ENUM ('Idea', 'Comment');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ideaId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentType" "ParentType" NOT NULL DEFAULT 'Idea',
ALTER COLUMN "ideaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
