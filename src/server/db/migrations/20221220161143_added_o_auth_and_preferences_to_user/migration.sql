/*
  Warnings:

  - You are about to drop the column `apiId` on the `OAuth` table. All the data in the column will be lost.
  - You are about to drop the column `apiId` on the `Preference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `OAuth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `OAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OAuth" DROP CONSTRAINT "OAuth_apiId_fkey";

-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_apiId_fkey";

-- DropIndex
DROP INDEX "OAuth_apiId_key";

-- DropIndex
DROP INDEX "Preference_apiId_key";

-- AlterTable
ALTER TABLE "OAuth" DROP COLUMN "apiId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "apiId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_userId_key" ON "OAuth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
