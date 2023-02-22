/*
  Warnings:

  - You are about to drop the `SiteImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SiteLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SiteImage" DROP CONSTRAINT "SiteImage_siteId_fkey";

-- DropForeignKey
ALTER TABLE "SiteLink" DROP CONSTRAINT "SiteLink_siteId_fkey";

-- DropTable
DROP TABLE "SiteImage";

-- DropTable
DROP TABLE "SiteLink";
