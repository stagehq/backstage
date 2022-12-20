/*
  Warnings:

  - You are about to drop the column `apiId` on the `ApiResponse` table. All the data in the column will be lost.
  - Added the required column `extensionId` to the `ApiResponse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApiResponse" DROP CONSTRAINT "ApiResponse_apiId_fkey";

-- AlterTable
ALTER TABLE "ApiResponse" DROP COLUMN "apiId",
ADD COLUMN     "extensionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ApiResponse" ADD CONSTRAINT "ApiResponse_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "Extension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
