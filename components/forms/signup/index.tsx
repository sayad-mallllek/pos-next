"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { signup } from "@/app/actions/auth/signup";
import { useActionState } from "react";
import z from "zod";
import { SignupFormSchema } from "./validations";

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
    <form className="flex flex-col gap-1" action={action}>
      {state?.errors?.general && (
        <p className="text-destructive text-sm">
          {state.errors.general.join(" ")}
        </p>
      )}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          disabled={isPending}
          required
          defaultValue={state?.form.name}
        />
        {state?.errors?.name && (
          <p className="text-destructive text-xs">
            {state.errors.name.join(" ")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
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
          <div className="text-destructive text-xs">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button
        type="submit"
        formAction={action}
        className="mt-4"
        disabled={isPending}
      >
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
