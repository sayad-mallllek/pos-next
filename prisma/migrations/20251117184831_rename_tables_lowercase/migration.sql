-- Rename tables to lowercase to match @@map directives
ALTER TABLE "User" RENAME TO "user";
ALTER TABLE "Session" RENAME TO "session";
ALTER TABLE "Auth" RENAME TO "account";
ALTER TABLE "VerificationToken" RENAME TO "verification";