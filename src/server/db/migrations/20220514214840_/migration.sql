/*
  Warnings:

  - You are about to drop the column `lastProjectId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ProjectContributor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectContributor" DROP CONSTRAINT "ProjectContributor_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectContributor" DROP CONSTRAINT "ProjectContributor_userMail_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lastProjectId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastProjectId";

-- DropTable
DROP TABLE "ProjectContributor";

-- CreateTable
CREATE TABLE "UserProjectRelation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userMail" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "UserProjectRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProjectRelation" ADD CONSTRAINT "UserProjectRelation_userMail_fkey" FOREIGN KEY ("userMail") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProjectRelation" ADD CONSTRAINT "UserProjectRelation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
