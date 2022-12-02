-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastProjectId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lastProjectId_fkey" FOREIGN KEY ("lastProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
