/*
  Warnings:

  - You are about to drop the `_IdeaToLabel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IdeaToLabel" DROP CONSTRAINT "_IdeaToLabel_A_fkey";

-- DropForeignKey
ALTER TABLE "_IdeaToLabel" DROP CONSTRAINT "_IdeaToLabel_B_fkey";

-- DropTable
DROP TABLE "_IdeaToLabel";
