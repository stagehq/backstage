/*
  Warnings:

  - You are about to drop the column `userId` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `extensionId` on the `ApiResponse` table. All the data in the column will be lost.
  - You are about to drop the `_ApiToExtension` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `extensionId` to the `Api` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oAuthId` to the `Api` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiId` to the `ApiResponse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Api" DROP CONSTRAINT "Api_userId_fkey";

-- DropForeignKey
ALTER TABLE "ApiResponse" DROP CONSTRAINT "ApiResponse_extensionId_fkey";

-- DropForeignKey
ALTER TABLE "_ApiToExtension" DROP CONSTRAINT "_ApiToExtension_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApiToExtension" DROP CONSTRAINT "_ApiToExtension_B_fkey";

-- AlterTable
ALTER TABLE "Api" DROP COLUMN "userId",
ADD COLUMN     "extensionId" TEXT NOT NULL,
ADD COLUMN     "oAuthId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ApiResponse" DROP COLUMN "extensionId",
ADD COLUMN     "apiId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ApiToExtension";

-- CreateTable
CREATE TABLE "_ApiToPreference" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApiToPreference_AB_unique" ON "_ApiToPreference"("A", "B");

-- CreateIndex
CREATE INDEX "_ApiToPreference_B_index" ON "_ApiToPreference"("B");

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "Extension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_oAuthId_fkey" FOREIGN KEY ("oAuthId") REFERENCES "OAuth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiResponse" ADD CONSTRAINT "ApiResponse_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiToPreference" ADD CONSTRAINT "_ApiToPreference_A_fkey" FOREIGN KEY ("A") REFERENCES "Api"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiToPreference" ADD CONSTRAINT "_ApiToPreference_B_fkey" FOREIGN KEY ("B") REFERENCES "Preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
