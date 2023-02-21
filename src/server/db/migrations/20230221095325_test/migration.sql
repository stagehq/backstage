/*
  Warnings:

  - You are about to alter the column `refreshToken` on the `OAuth` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2951)`.

*/
-- AlterTable
ALTER TABLE "OAuth" ALTER COLUMN "refreshToken" SET DATA TYPE VARCHAR(2951);
