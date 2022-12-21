/*
  Warnings:

  - Made the column `apiConnectorId` on table `OAuth` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OAuth" DROP CONSTRAINT "OAuth_apiConnectorId_fkey";

-- AlterTable
ALTER TABLE "OAuth" ALTER COLUMN "apiConnectorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_apiConnectorId_fkey" FOREIGN KEY ("apiConnectorId") REFERENCES "ApiConnector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
