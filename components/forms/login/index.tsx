"use client";

import { login } from "@/app/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import z from "zod";
import { LoginFormSchema } from "./validations";

type LoginErrors = Partial<
  Record<keyof z.infer<typeof LoginFormSchema> | "general", string[]>
>;

export type LoginFormStateType =
  | {
      errors?: LoginErrors;
      form: z.infer<typeof LoginFormSchema>;
    }
  | undefined;

export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <form className="flex flex-col gap-1" action={action}>
      {state?.errors?.general && (
        <p className="text-destructive text-sm">
          {state.errors.general.join(" ")}
        </p>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          disabled={isPending}
          required
          defaultValue={state?.form.email}
        />
        {state?.errors?.email && (
          <p className="text-destructive text-xs">
            {state.errors.email.join(" ")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          disabled={isPending}
          required
          defaultValue={state?.form.password}
        />
        {state?.errors?.password && (
          <p className="text-destructive text-xs">
            {state.errors.password.join(" ")}
          </p>
        )}
      </div>

      <Button type="submit" className="mt-4" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
