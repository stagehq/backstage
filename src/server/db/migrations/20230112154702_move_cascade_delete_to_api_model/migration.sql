-- DropForeignKey
ALTER TABLE "Api" DROP CONSTRAINT "Api_extensionId_fkey";

-- DropForeignKey
ALTER TABLE "Extension" DROP CONSTRAINT "Extension_siteId_fkey";

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "Extension"("id") ON DELETE CASCADE ON UPDATE CASCADE;
