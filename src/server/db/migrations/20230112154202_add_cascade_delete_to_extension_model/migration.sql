-- DropForeignKey
ALTER TABLE "Extension" DROP CONSTRAINT "Extension_siteId_fkey";

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
