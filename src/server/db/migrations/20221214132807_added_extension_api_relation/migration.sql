/*
  Warnings:

  - Added the required column `apiId` to the `Extension` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extension" ADD COLUMN     "apiId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
