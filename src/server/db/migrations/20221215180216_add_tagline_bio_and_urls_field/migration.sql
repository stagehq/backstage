-- AlterTable
ALTER TABLE "Extension" ADD COLUMN     "urls" TEXT[];

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "tagline" TEXT;
