-- DropForeignKey
ALTER TABLE "Api" DROP CONSTRAINT "Api_oAuthId_fkey";

-- AlterTable
ALTER TABLE "Api" ALTER COLUMN "oAuthId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_oAuthId_fkey" FOREIGN KEY ("oAuthId") REFERENCES "OAuth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
