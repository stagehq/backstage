/*
  Warnings:

  - Made the column `sortOrder` on table `Extension` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE extension_sortorder_seq;
ALTER TABLE "Extension" ALTER COLUMN "sortOrder" SET NOT NULL,
ALTER COLUMN "sortOrder" SET DEFAULT nextval('extension_sortorder_seq');
ALTER SEQUENCE extension_sortorder_seq OWNED BY "Extension"."sortOrder";
