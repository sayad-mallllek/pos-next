"use server";

import { LoginFormStateType } from "@/components/forms/login";
import { LoginFormSchema } from "@/components/forms/login/validations";

import {
  ApiErrorPayload,
  extractApiErrorMessage,
  extractFieldErrors,
  persistResponseCookies,
  resolveApiEndpoint,
} from "./helpers";
import type { z } from "zod";
import { redirect } from "next/navigation";

const LOGIN_FIELDS = ["email", "password"] as const;
type LoginField = (typeof LOGIN_FIELDS)[number];
type LoginFormShape = z.infer<typeof LoginFormSchema>;
type LoginFormErrors = Partial<Record<LoginField | "general", string[]>>;

const LOGIN_GENERIC_ERROR =
  "Unable to sign you in right now. Please try again.";

function getTextValue(formData: FormData, field: LoginField) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function snapshotLoginForm(formData: FormData): LoginFormShape {
  return {
    email: getTextValue(formData, "email"),
    password: getTextValue(formData, "password"),
  } satisfies LoginFormShape;
}

function buildLoginErrorState(
  form: LoginFormShape,
  errors: LoginFormErrors
): NonNullable<LoginFormStateType> {
  return {
    form,
    errors,
  };
}

export async function login(
  _state: LoginFormStateType,
  formData: FormData
): Promise<LoginFormStateType> {
  const formSnapshot = snapshotLoginForm(formData);
  const validatedFields = LoginFormSchema.safeParse(formSnapshot);

  if (!validatedFields.success) {
    const validationErrors: LoginFormErrors = extractFieldErrors(
      LOGIN_FIELDS,
      validatedFields.error.issues
    );

    return buildLoginErrorState(formSnapshot, validationErrors);
  }

  const endpoint = await resolveApiEndpoint("/api/login");

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
    console.error("Login request failed", error);
    const networkErrors: LoginFormErrors = {
      general: [LOGIN_GENERIC_ERROR],
    };

    return buildLoginErrorState(validatedFields.data, networkErrors);
  }

  if (!response.ok) {
    const payload: ApiErrorPayload | null = await response
      .json()
      .catch(() => null);

    const fieldErrors = extractFieldErrors(LOGIN_FIELDS, payload?.details);
    const generalError =
      extractApiErrorMessage(payload) ||
      `Login failed with status ${response.status}`;

    const collectedErrors: LoginFormErrors = {
      ...fieldErrors,
      general: [generalError || LOGIN_GENERIC_ERROR],
    };

    return buildLoginErrorState(validatedFields.data, collectedErrors);
  }

  await persistResponseCookies(response.headers.get("set-cookie"));

  redirect("/dashboard");
}
