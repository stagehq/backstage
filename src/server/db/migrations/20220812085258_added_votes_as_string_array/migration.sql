-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "votes" TEXT[] DEFAULT ARRAY[]::TEXT[];
