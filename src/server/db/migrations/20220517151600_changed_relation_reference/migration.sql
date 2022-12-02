-- DropForeignKey
ALTER TABLE "UserProjectRelation" DROP CONSTRAINT "UserProjectRelation_userMail_fkey";

-- AddForeignKey
ALTER TABLE "UserProjectRelation" ADD CONSTRAINT "UserProjectRelation_userMail_fkey" FOREIGN KEY ("userMail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
