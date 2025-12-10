"use client";

import { login } from "@/app/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { LoginFormShape } from "./validations";
import { cn } from "@/lib/utils";
import Link from "next/link";

type LoginErrors = Partial<Record<keyof LoginFormShape | "general", string[]>>;

export type LoginFormStateType =
  | {
      errors?: LoginErrors;
      form: LoginFormShape;
    }
  | undefined;

export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, undefined);

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
          className=" rounded-lg border-gray-300 focus:border-forest-500 focus:ring-forest-500"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-400">{state.errors.email.join(" ")}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs text-gray-500 hover:text-forest-600"
          >
            Forgot password?
          </Link>
        </div>
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
          <p className="text-xs text-red-400">
            {state.errors.password.join(" ")}
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
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
}
