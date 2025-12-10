"use server";
import "server-only";

import { SignupFormStateType } from "@/components/forms/signup";
import { SignupFormSchema } from "@/components/forms/signup/validations";

import { tryCatch, withFormState } from "./helpers";
import type { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/lib/better-auth";
import { headers } from "next/headers";

const SIGNUP_FIELDS = ["name", "email", "password"] as const;
type SignupField = (typeof SIGNUP_FIELDS)[number];
type SignupFormShape = z.infer<typeof SignupFormSchema>;
type SignupFormErrors = Partial<Record<SignupField | "general", string[]>>;
type SignupHandlerResult = { errors?: SignupFormErrors };

const SIGNUP_GENERIC_ERROR =
  "Unable to create your account right now. Please try again.";

function asText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function readSignupForm(formData: FormData): SignupFormShape {
  return {
    name: asText(formData.get("name")),
    email: asText(formData.get("email")),
    password: asText(formData.get("password")),
  } satisfies SignupFormShape;
}

const signupAction = withFormState<SignupFormShape, SignupHandlerResult>(
  readSignupForm,
  async (form) => {
    const validated = SignupFormSchema.safeParse(form);

    if (!validated.success) {
      return {
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { error } = await tryCatch(async () =>
      auth.api.signUpEmail({
        body: {
          email: validated.data.email,
          password: validated.data.password,
          name: validated.data.name,
          callbackURL: "/dashboard",
        },
        headers: await headers(),
      })
    );

    if (error) {
      return {
        errors: {
          general: [error.message || SIGNUP_GENERIC_ERROR],
        },
      };
    }

    redirect("/login");
  }
);

export const signup: (
  state: SignupFormStateType,
  formData: FormData
) => Promise<SignupFormStateType> = signupAction;
