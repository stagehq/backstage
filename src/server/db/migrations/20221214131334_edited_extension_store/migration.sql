/*
  Warnings:

  - You are about to drop the column `storeApiId` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `storeRouteId` on the `ApiResponses` table. All the data in the column will be lost.
  - You are about to drop the `StoreAPI` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreRoute` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apiConnectorId` to the `Api` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiConnectorRouteId` to the `ApiResponses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Api" DROP CONSTRAINT "Api_storeApiId_fkey";

-- DropForeignKey
ALTER TABLE "ApiResponses" DROP CONSTRAINT "ApiResponses_storeRouteId_fkey";

-- DropForeignKey
ALTER TABLE "StoreRoute" DROP CONSTRAINT "StoreRoute_storeApiId_fkey";

-- AlterTable
ALTER TABLE "Api" DROP COLUMN "storeApiId",
ADD COLUMN     "apiConnectorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ApiResponses" DROP COLUMN "storeRouteId",
ADD COLUMN     "apiConnectorRouteId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StoreAPI";

-- DropTable
DROP TABLE "StoreRoute";

-- CreateTable
CREATE TABLE "ApiConnector" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "markdown" TEXT,

    CONSTRAINT "ApiConnector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiConnectorRoute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "apiConnectorId" TEXT NOT NULL,

    CONSTRAINT "ApiConnectorRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApiConnectorRouteToStoreExtension" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiConnector_name_key" ON "ApiConnector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ApiConnectorRouteToStoreExtension_AB_unique" ON "_ApiConnectorRouteToStoreExtension"("A", "B");

-- CreateIndex
CREATE INDEX "_ApiConnectorRouteToStoreExtension_B_index" ON "_ApiConnectorRouteToStoreExtension"("B");

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_apiConnectorId_fkey" FOREIGN KEY ("apiConnectorId") REFERENCES "ApiConnector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiResponses" ADD CONSTRAINT "ApiResponses_apiConnectorRouteId_fkey" FOREIGN KEY ("apiConnectorRouteId") REFERENCES "ApiConnectorRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiConnectorRoute" ADD CONSTRAINT "ApiConnectorRoute_apiConnectorId_fkey" FOREIGN KEY ("apiConnectorId") REFERENCES "ApiConnector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiConnectorRouteToStoreExtension" ADD CONSTRAINT "_ApiConnectorRouteToStoreExtension_A_fkey" FOREIGN KEY ("A") REFERENCES "ApiConnectorRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiConnectorRouteToStoreExtension" ADD CONSTRAINT "_ApiConnectorRouteToStoreExtension_B_fkey" FOREIGN KEY ("B") REFERENCES "StoreExtension"("id") ON DELETE CASCADE ON UPDATE CASCADE;
