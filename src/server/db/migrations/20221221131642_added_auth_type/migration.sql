-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('oAuth', 'preferences', 'oAuthWithPreferences');

-- AlterTable
ALTER TABLE "ApiConnector" ADD COLUMN     "authType" "AuthType";
