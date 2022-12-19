/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `expiresIn` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `idToken` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `isExpired` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Api` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Api" DROP COLUMN "accessToken",
DROP COLUMN "expiresIn",
DROP COLUMN "idToken",
DROP COLUMN "isExpired",
DROP COLUMN "refreshToken",
DROP COLUMN "scope";

-- CreateTable
CREATE TABLE "OAuth" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessToken" TEXT NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "expiresIn" INTEGER,
    "idToken" TEXT,
    "refreshToken" TEXT,
    "scope" TEXT,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("id")
);
