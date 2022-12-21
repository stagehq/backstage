/*
  Warnings:

  - Made the column `authType` on table `ApiConnector` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ApiConnector" ALTER COLUMN "authType" SET NOT NULL;
