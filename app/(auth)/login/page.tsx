import LoginForm from "@/components/forms/login";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/lib/icons/GoogleIcon";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-forest-600">
        Sign in to your account
      </h1>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-forest-600 underline underline-offset-4 hover:text-forest-500"
        >
          Sign up
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
        By clicking on sign in, you agree to our{" "}
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
