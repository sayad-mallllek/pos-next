"use client";

import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { useActionState } from "react";
import z from "zod";
import { SignupFormSchema } from "./validations";

export type SignupFormStateType =
  | { errors: Record<keyof z.infer<typeof SignupFormSchema>, string[]> }
  | undefined;

export default function SignupForm() {
  const [state, action, isPending] = useActionState<
    SignupFormStateType | undefined
  >(signup, undefined);

  return (
    <form className="flex flex-col gap-1" action={action}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          disabled={isPending}
          required
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
      <Button className="mt-4" disabled={isPending} type="submit">
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
