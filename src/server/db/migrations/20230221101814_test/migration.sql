/*
  Warnings:

  - You are about to alter the column `accessToken` on the `OAuth` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2951)` to `VarChar(319)`.
  - You are about to alter the column `refreshToken` on the `OAuth` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2951)` to `VarChar(319)`.

*/
-- AlterTable
ALTER TABLE "OAuth" ALTER COLUMN "accessToken" SET DATA TYPE VARCHAR(319),
ALTER COLUMN "refreshToken" SET DATA TYPE VARCHAR(319);
