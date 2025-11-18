"use server";

import { SignupFormStateType } from "@/components/forms/signup";
import { SignupFormSchema } from "@/components/forms/signup/validations";

import {
  ApiErrorPayload,
  extractApiErrorMessage,
  extractFieldErrors,
  resolveApiEndpoint,
} from "./helpers";
import type { z } from "zod";
import { redirect } from "next/navigation";

const SIGNUP_FIELDS = ["name", "email", "password"] as const;
type SignupField = (typeof SIGNUP_FIELDS)[number];
type SignupFormShape = z.infer<typeof SignupFormSchema>;
type SignupFormErrors = Partial<Record<SignupField | "general", string[]>>;

const SIGNUP_GENERIC_ERROR =
  "Unable to create your account right now. Please try again.";

function getTextValue(formData: FormData, field: SignupField) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function snapshotSignupForm(formData: FormData): SignupFormShape {
  return {
    name: getTextValue(formData, "name"),
    email: getTextValue(formData, "email"),
    password: getTextValue(formData, "password"),
  } satisfies SignupFormShape;
}

function buildSignupErrorState(
  form: SignupFormShape,
  errors: SignupFormErrors
): NonNullable<SignupFormStateType> {
  return {
    form,
    errors,
  };
}

export async function signup(
  _state: SignupFormStateType,
  formData: FormData
): Promise<SignupFormStateType> {
  const formSnapshot = snapshotSignupForm(formData);
  const validatedFields = SignupFormSchema.safeParse(formSnapshot);

  if (!validatedFields.success) {
    const validationErrors: SignupFormErrors = extractFieldErrors(
      SIGNUP_FIELDS,
      validatedFields.error.issues
    );

    return buildSignupErrorState(formSnapshot, validationErrors);
  }

  const endpoint = await resolveApiEndpoint("/api/signup");

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });
  } catch (error) {
    console.error("Signup request failed", error);
    const networkErrors: SignupFormErrors = {
      general: [SIGNUP_GENERIC_ERROR],
    };
    return buildSignupErrorState(validatedFields.data, networkErrors);
  }

  if (!response.ok) {
    const payload: ApiErrorPayload | null = await response
      .json()
      .catch(() => null);

    const fieldErrors = extractFieldErrors(SIGNUP_FIELDS, payload?.details);
    const generalError =
      extractApiErrorMessage(payload) ||
      `Signup failed with status ${response.status}`;

    const collectedErrors: SignupFormErrors = {
      ...fieldErrors,
      general: [generalError || SIGNUP_GENERIC_ERROR],
    };

    return buildSignupErrorState(validatedFields.data, collectedErrors);
  }

  redirect("/login");
}
