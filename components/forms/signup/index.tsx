"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { signup } from "@/app/actions/auth/signup";
import { useActionState } from "react";
import z from "zod";
import { SignupFormSchema } from "./validations";
import { cn } from "@/lib/utils";

type SignupErrors = Partial<
  Record<keyof z.infer<typeof SignupFormSchema> | "general", string[]>
>;

export type SignupFormStateType =
  | {
      errors?: SignupErrors;
      form: z.infer<typeof SignupFormSchema>;
    }
  | undefined;

export default function SignupForm() {
  const [state, action, isPending] = useActionState(signup, undefined);

  return (
    <form className="flex flex-col gap-4" action={action}>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">
          Full name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          disabled={isPending}
          required
          defaultValue={state?.form.name}
          className="rounded-lg border-gray-300 focus:border-forest-500 focus:ring-forest-500"
        />
        {state?.errors?.name && (
          <p className="text-xs text-red-400">{state.errors.name.join(" ")}</p>
        )}
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700">
          Password
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
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
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
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
