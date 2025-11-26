"use server";

import { SignupFormStateType } from "@/components/forms/signup";
import { SignupFormSchema } from "@/components/forms/signup/validations";

import {
  ApiErrorPayload,
  extractApiErrorMessage,
  extractFieldErrors,
  resolveApiEndpoint,
  withFormState,
} from "./helpers";
import type { z } from "zod";
import { redirect } from "next/navigation";

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

    const endpoint = await resolveApiEndpoint("/api/signup");

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated.data),
      });
    } catch (error) {
      console.error("Signup request failed", error);
      return {
        errors: {
          general: [SIGNUP_GENERIC_ERROR],
        },
      };
    }

    if (!response.ok) {
      const payload: ApiErrorPayload | null = await response
        .json()
        .catch(() => null);

      const fieldErrors = extractFieldErrors(SIGNUP_FIELDS, payload?.details);
      const generalError =
        extractApiErrorMessage(payload) ||
        `Signup failed with status ${response.status}`;

      return {
        errors: {
          ...fieldErrors,
          general: [generalError || SIGNUP_GENERIC_ERROR],
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
