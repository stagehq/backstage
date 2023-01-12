-- DropForeignKey
ALTER TABLE "ApiResponse" DROP CONSTRAINT "ApiResponse_apiId_fkey";

-- AddForeignKey
ALTER TABLE "ApiResponse" ADD CONSTRAINT "ApiResponse_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api"("id") ON DELETE CASCADE ON UPDATE CASCADE;
