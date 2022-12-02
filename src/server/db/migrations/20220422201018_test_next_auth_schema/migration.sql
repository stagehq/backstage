-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Account.provider_providerAccountId_unique" RENAME TO "Account_provider_providerAccountId_key";

-- RenameIndex
ALTER INDEX "Project.slug_unique" RENAME TO "Project_slug_key";

-- RenameIndex
ALTER INDEX "Project.stripeCustomerId_unique" RENAME TO "Project_stripeCustomerId_key";

-- RenameIndex
ALTER INDEX "Project.stripeSubscriptionId_unique" RENAME TO "Project_stripeSubscriptionId_key";

-- RenameIndex
ALTER INDEX "Session.sessionToken_unique" RENAME TO "Session_sessionToken_key";

-- RenameIndex
ALTER INDEX "User.alias_unique" RENAME TO "User_alias_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "VerificationToken.identifier_token_unique" RENAME TO "VerificationToken_identifier_token_key";

-- RenameIndex
ALTER INDEX "VerificationToken.token_unique" RENAME TO "VerificationToken_token_key";
