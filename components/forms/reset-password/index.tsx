"use client";

import { resetPassword } from "@/app/actions/auth/reset-password";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useActionState } from "react";

export type { ResetPasswordFormStateType } from "./types";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, action, isPending] = useActionState(resetPassword, undefined);

  if (state?.success) {
    return (
      <div className="space-y-4 text-center">
        <div className="rounded-lg border border-forest-200 bg-forest-50 p-4">
          <p className="text-sm text-forest-700">
            Your password has been reset successfully.
          </p>
        </div>
      </div>
    );
  }

  if (state?.errors?.token) {
    return (
      <div className="space-y-4 text-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{state.errors.token.join(" ")}</p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-block text-sm font-medium text-forest-600 hover:text-forest-500"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" action={action}>
      <input type="hidden" name="token" value={token} />

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700">
          New password
        </Label>
        <PasswordInput
          id="password"
          name="password"
          placeholder="••••••••"
          disabled={isPending}
          required
          defaultValue={state?.form.password}
          className="rounded-lg border-gray-300 focus:border-forest-500 focus:ring-forest-500"
        />
        {state?.errors?.password && (
          <div className="text-xs text-red-400">
            <p>Password must:</p>
            <ul className="ml-2">
              {state.errors.password.map((error: string) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700">
          Confirm password
        </Label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          placeholder="••••••••"
          disabled={isPending}
          required
          defaultValue={state?.form.confirmPassword}
          className="rounded-lg border-gray-300 focus:border-forest-500 focus:ring-forest-500"
        />
        {state?.errors?.confirmPassword && (
          <p className="text-xs text-red-400">
            {state.errors.confirmPassword.join(" ")}
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <p
          className={cn("text-center text-sm text-red-400", {
            invisible: !state?.errors?.general,
          })}
        >
          {state?.errors?.general?.join(" ") || "\u00A0"}
        </p>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-forest-500 py-3 text-sm font-medium text-white transition-colors hover:bg-forest-600 disabled:opacity-50"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </form>
  );
}
