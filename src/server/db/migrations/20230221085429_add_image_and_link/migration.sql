/*
  Warnings:

  - You are about to alter the column `accessToken` on the `OAuth` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `refreshToken` on the `OAuth` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "OAuth" ALTER COLUMN "accessToken" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "refreshToken" SET DATA TYPE VARCHAR(1000);
