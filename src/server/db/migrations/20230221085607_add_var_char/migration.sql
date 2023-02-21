/*
  Warnings:

  - You are about to alter the column `accessToken` on the `OAuth` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(200)`.
  - You are about to alter the column `refreshToken` on the `OAuth` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "OAuth" ALTER COLUMN "accessToken" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "refreshToken" SET DATA TYPE VARCHAR(200);
