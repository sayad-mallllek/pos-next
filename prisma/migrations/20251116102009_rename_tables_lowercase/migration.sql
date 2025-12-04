-- Rename legacy CamelCase tables to lowercase names expected by the current Prisma schema.

DO $$
BEGIN
	IF to_regclass('public.user') IS NULL AND to_regclass('public."User"') IS NOT NULL THEN
		EXECUTE 'ALTER TABLE "User" RENAME TO "user"';
	END IF;
END $$;

DO $$
BEGIN
	IF to_regclass('public.session') IS NULL AND to_regclass('public."Session"') IS NOT NULL THEN
		EXECUTE 'ALTER TABLE "Session" RENAME TO "session"';
	END IF;
END $$;

DO $$
BEGIN
	IF to_regclass('public.account') IS NULL AND to_regclass('public."Account"') IS NOT NULL THEN
		EXECUTE 'ALTER TABLE "Account" RENAME TO "account"';
	END IF;
END $$;

DO $$
BEGIN
	IF to_regclass('public.verification') IS NULL AND to_regclass('public."VerificationToken"') IS NOT NULL THEN
		EXECUTE 'ALTER TABLE "VerificationToken" RENAME TO "verification"';
	END IF;
END $$;