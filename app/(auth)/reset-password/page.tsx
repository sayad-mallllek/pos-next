import ResetPasswordForm from "@/components/forms/reset-password";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/forgot-password");
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-forest-600">
        Create new password
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Enter your new password below to complete the reset.
      </p>

      <div className="mt-8">
        <ResetPasswordForm token={token} />
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link
          href="/login"
          className="font-medium text-forest-600 underline underline-offset-4 hover:text-forest-500"
        >
          ← Back to sign in
        </Link>
      </p>
    </>
  );
}
