/*
  Warnings:

  - You are about to drop the column `apiId` on the `Extension` table. All the data in the column will be lost.
  - Added the required column `extensionId` to the `Api` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Extension" DROP CONSTRAINT "Extension_apiId_fkey";

-- AlterTable
ALTER TABLE "Api" ADD COLUMN     "extensionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Extension" DROP COLUMN "apiId";

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "Extension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
