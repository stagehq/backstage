-- AlterTable
ALTER TABLE "Extension" ALTER COLUMN "sortOrder" DROP DEFAULT;
DROP SEQUENCE "extension_sortorder_seq";
