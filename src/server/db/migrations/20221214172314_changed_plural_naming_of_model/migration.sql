/*
  Warnings:

  - You are about to drop the `ApiResponses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApiResponses" DROP CONSTRAINT "ApiResponses_apiConnectorRouteId_fkey";

-- DropForeignKey
ALTER TABLE "ApiResponses" DROP CONSTRAINT "ApiResponses_apiId_fkey";

-- DropTable
DROP TABLE "ApiResponses";

-- CreateTable
CREATE TABLE "ApiResponse" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" TEXT NOT NULL,
    "apiId" TEXT NOT NULL,
    "apiConnectorRouteId" TEXT NOT NULL,

    CONSTRAINT "ApiResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApiResponse" ADD CONSTRAINT "ApiResponse_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiResponse" ADD CONSTRAINT "ApiResponse_apiConnectorRouteId_fkey" FOREIGN KEY ("apiConnectorRouteId") REFERENCES "ApiConnectorRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
