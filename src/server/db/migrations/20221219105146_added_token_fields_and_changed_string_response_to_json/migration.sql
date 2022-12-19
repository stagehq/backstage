/*
  Warnings:

  - The `response` column on the `ApiResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Api" ADD COLUMN     "expiresIn" INTEGER,
ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "isExpired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scope" TEXT,
ALTER COLUMN "refreshToken" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ApiResponse" DROP COLUMN "response",
ADD COLUMN     "response" JSONB;
