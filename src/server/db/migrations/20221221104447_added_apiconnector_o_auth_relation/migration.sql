-- AlterTable
ALTER TABLE "ApiResponse" ALTER COLUMN "apiConnectorRouteId" SET DEFAULT 'clbnod4jm0002eo372w1i5dp1';

-- AlterTable
ALTER TABLE "OAuth" ADD COLUMN     "apiConnectorId" TEXT;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_apiConnectorId_fkey" FOREIGN KEY ("apiConnectorId") REFERENCES "ApiConnector"("id") ON DELETE SET NULL ON UPDATE CASCADE;
