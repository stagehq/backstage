/*
  Warnings:

  - You are about to drop the column `id` on the `ProjectContributor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProjectContributor_id_key";

-- AlterTable
ALTER TABLE "ProjectContributor" DROP COLUMN "id",
ADD CONSTRAINT "ProjectContributor_pkey" PRIMARY KEY ("userMail", "projectId");
