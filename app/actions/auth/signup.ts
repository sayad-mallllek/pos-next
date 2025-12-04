"use server";

import { SignupFormStateType } from "@/components/forms/signup";
import { SignupFormSchema } from "@/components/forms/signup/validations";

import { withFormState } from "./helpers";
import type { z } from "zod";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/better-auth";

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

    const response = await authClient.signUp.email({
      email: validated.data.email,
      password: validated.data.password,
      name: validated.data.name,
      callbackURL: "/dashboard",
    });

    console.log("Signup response:", response);

    if (response.error)
      return {
        errors: {
          general: [response.error.message || SIGNUP_GENERIC_ERROR],
        },
      };

    redirect("/login");
  }
);

export const signup: (
  state: SignupFormStateType,
  formData: FormData
) => Promise<SignupFormStateType> = signupAction;
