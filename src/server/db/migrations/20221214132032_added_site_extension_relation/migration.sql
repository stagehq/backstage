/*
  Warnings:

  - Added the required column `siteId` to the `Extension` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extension" ADD COLUMN     "siteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
