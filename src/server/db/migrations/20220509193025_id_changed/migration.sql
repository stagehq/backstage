/*
  Warnings:

  - The primary key for the `ProjectContributor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `ProjectContributor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProjectContributor" DROP CONSTRAINT "ProjectContributor_pkey",
ALTER COLUMN "projectId" SET DEFAULT E'',
ALTER COLUMN "userMail" SET DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "ProjectContributor_id_key" ON "ProjectContributor"("id");
