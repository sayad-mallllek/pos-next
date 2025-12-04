import ForgotPasswordForm from "@/components/forms/forgot-password";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-forest-600">
        Reset your password
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>

      <div className="mt-8">
        <ForgotPasswordForm />
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-forest-600 underline underline-offset-4 hover:text-forest-500"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
