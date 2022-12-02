-- AlterIndex
ALTER INDEX "Session_sessionToken_key" RENAME TO "Session.sessionToken_unique";

-- AlterIndex
ALTER INDEX "User_alias_key" RENAME TO "User.alias_unique";

-- AlterIndex
ALTER INDEX "User_email_key" RENAME TO "User.email_unique";

-- AlterIndex
ALTER INDEX "Project_slug_key" RENAME TO "Project.slug_unique";

-- AlterIndex
ALTER INDEX "Project_stripeCustomerId_key" RENAME TO "Project.stripeCustomerId_unique";

-- AlterIndex
ALTER INDEX "Project_stripeSubscriptionId_key" RENAME TO "Project.stripeSubscriptionId_unique";

-- AlterIndex
ALTER INDEX "VerificationToken_identifier_token_key" RENAME TO "VerificationToken.identifier_token_unique";

-- AlterIndex
ALTER INDEX "VerificationToken_token_key" RENAME TO "VerificationToken.token_unique";

-- AlterIndex
ALTER INDEX "Account_provider_providerAccountId_key" RENAME TO "Account.provider_providerAccountId_unique";
