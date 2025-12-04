import SignupForm from "@/components/forms/signup";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/lib/icons/GoogleIcon";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-forest-600">
        Sign up for an account
      </h1>

      <div className="mt-8">
        <SignupForm />
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-forest-600 underline underline-offset-4 hover:text-forest-500"
        >
          Sign in
        </Link>
      </p>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-4 flex w-full items-center justify-center gap-2"
        >
          <GoogleIcon />
          Google
        </Button>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        By clicking on sign up, you agree to our{" "}
        <Link href="#" className="text-forest-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-forest-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </>
  );
}
