"use client";

import { forgotPassword } from "@/app/actions/auth/forgot-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { ForgotPasswordFormSchema } from "./validations";
import { cn } from "@/lib/utils";
import type { ForgotPasswordFormStateType } from "./types";

export type { ForgotPasswordFormStateType } from "./types";

export default function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(forgotPassword, undefined);

  if (state?.success) {
    return (
      <div className="rounded-lg border border-forest-200 bg-forest-50 p-4 text-center">
        <p className="text-sm text-forest-700">
          If an account exists with that email, you will receive a password
          reset link shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" action={action}>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="hello@example.com"
          disabled={isPending}
          required
          defaultValue={state?.form.email}
          className="rounded-lg border-gray-300 focus:border-forest-500 focus:ring-forest-500"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-400">{state.errors.email.join(" ")}</p>
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
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>
    </form>
  );
}
