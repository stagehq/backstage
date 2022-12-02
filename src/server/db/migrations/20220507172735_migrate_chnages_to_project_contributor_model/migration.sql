/*
  Warnings:

  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `ProjectContributor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProjectContributor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ProjectContributor` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userMail]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userMail]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectContributor" DROP CONSTRAINT "ProjectContributor_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_projectId_fkey";

-- DropIndex
DROP INDEX "Notification_userId_key";

-- DropIndex
DROP INDEX "Payment_userId_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "userId",
ADD COLUMN     "userMail" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "userId",
ADD COLUMN     "userMail" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "ProjectContributor" DROP CONSTRAINT "ProjectContributor_pkey",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "userMail" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "projectId" SET DEFAULT E'',
ADD CONSTRAINT "ProjectContributor_pkey" PRIMARY KEY ("userMail", "projectId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "projectId",
ADD COLUMN     "lastProjectId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userMail_key" ON "Notification"("userMail");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_userMail_key" ON "Payment"("userMail");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lastProjectId_fkey" FOREIGN KEY ("lastProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectContributor" ADD CONSTRAINT "ProjectContributor_userMail_fkey" FOREIGN KEY ("userMail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userMail_fkey" FOREIGN KEY ("userMail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userMail_fkey" FOREIGN KEY ("userMail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
