"use client";

import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

import { useActionState, useTransition } from "react";
import z from "zod";
import { SignupFormSchema } from "./validations";
import { useFormStatus } from "react-dom";

export type SignupFormStateType =
  | {
      errors: Record<keyof z.infer<typeof SignupFormSchema>, string[]>;
      form: z.infer<typeof SignupFormSchema>;
    }
  | undefined;

export default function SignupForm() {
  const [state, action, isPending] = useActionState<
    SignupFormStateType | undefined
  >(signup, undefined);

  return (
    <form className="flex flex-col gap-1" method="POST">
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
          <p className="text-destructive text-xs">{state.errors.name}</p>
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
          <p className="text-destructive text-xs">{state.errors.email}</p>
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
