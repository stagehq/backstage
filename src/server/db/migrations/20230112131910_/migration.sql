/*
  Warnings:

  - A unique constraint covering the columns `[blockId]` on the table `StoreExtension` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StoreExtension" ADD COLUMN     "blockId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "StoreExtension_blockId_key" ON "StoreExtension"("blockId");
