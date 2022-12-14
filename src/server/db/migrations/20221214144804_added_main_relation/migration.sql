/*
  Warnings:

  - A unique constraint covering the columns `[userMainSiteId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "userMainSiteId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Site_userMainSiteId_key" ON "Site"("userMainSiteId");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_userMainSiteId_fkey" FOREIGN KEY ("userMainSiteId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
