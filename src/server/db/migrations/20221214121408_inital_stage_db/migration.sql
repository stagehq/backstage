/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastProjectId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Idea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThreadComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProjectRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IdeaToLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_participantInIdea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_reactionCreator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_votedInIdea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ideaId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_userId_fkey";

-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userMail_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userMail_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_ideaId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_threadCommentId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadComment" DROP CONSTRAINT "ThreadComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadComment" DROP CONSTRAINT "ThreadComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lastProjectId_fkey";

-- DropForeignKey
ALTER TABLE "UserProjectRelation" DROP CONSTRAINT "UserProjectRelation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserProjectRelation" DROP CONSTRAINT "UserProjectRelation_userMail_fkey";

-- DropForeignKey
ALTER TABLE "_IdeaToLabel" DROP CONSTRAINT "_IdeaToLabel_A_fkey";

-- DropForeignKey
ALTER TABLE "_IdeaToLabel" DROP CONSTRAINT "_IdeaToLabel_B_fkey";

-- DropForeignKey
ALTER TABLE "_participantInIdea" DROP CONSTRAINT "_participantInIdea_A_fkey";

-- DropForeignKey
ALTER TABLE "_participantInIdea" DROP CONSTRAINT "_participantInIdea_B_fkey";

-- DropForeignKey
ALTER TABLE "_reactionCreator" DROP CONSTRAINT "_reactionCreator_A_fkey";

-- DropForeignKey
ALTER TABLE "_reactionCreator" DROP CONSTRAINT "_reactionCreator_B_fkey";

-- DropForeignKey
ALTER TABLE "_votedInIdea" DROP CONSTRAINT "_votedInIdea_A_fkey";

-- DropForeignKey
ALTER TABLE "_votedInIdea" DROP CONSTRAINT "_votedInIdea_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "lastProjectId",
DROP COLUMN "url";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Idea";

-- DropTable
DROP TABLE "Label";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Reaction";

-- DropTable
DROP TABLE "ThreadComment";

-- DropTable
DROP TABLE "UserProjectRelation";

-- DropTable
DROP TABLE "_IdeaToLabel";

-- DropTable
DROP TABLE "_participantInIdea";

-- DropTable
DROP TABLE "_reactionCreator";

-- DropTable
DROP TABLE "_votedInIdea";

-- DropEnum
DROP TYPE "ParentType";

-- DropEnum
DROP TYPE "PaymentPlan";

-- DropEnum
DROP TYPE "ProjectRole";

-- DropEnum
DROP TYPE "PushNotification";
