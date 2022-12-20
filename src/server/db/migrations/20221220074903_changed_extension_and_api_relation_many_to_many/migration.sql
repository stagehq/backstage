/*
  Warnings:

  - You are about to drop the column `extensionId` on the `Api` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Api` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Api" DROP CONSTRAINT "Api_extensionId_fkey";

-- AlterTable
ALTER TABLE "Api" DROP COLUMN "extensionId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_ApiToExtension" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApiToExtension_AB_unique" ON "_ApiToExtension"("A", "B");

-- CreateIndex
CREATE INDEX "_ApiToExtension_B_index" ON "_ApiToExtension"("B");

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiToExtension" ADD CONSTRAINT "_ApiToExtension_A_fkey" FOREIGN KEY ("A") REFERENCES "Api"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiToExtension" ADD CONSTRAINT "_ApiToExtension_B_fkey" FOREIGN KEY ("B") REFERENCES "Extension"("id") ON DELETE CASCADE ON UPDATE CASCADE;
