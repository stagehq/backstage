/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `OAuth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiId` to the `OAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OAuth" ADD COLUMN     "apiId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_apiId_key" ON "OAuth"("apiId");

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
