-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('owner', 'contributer', 'core');

-- AlterTable
ALTER TABLE "UserProjectRelation" ADD COLUMN     "role" "ProjectRole" NOT NULL DEFAULT E'contributer';
