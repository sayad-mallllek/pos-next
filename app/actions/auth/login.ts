"use server";

import { LoginFormStateType } from "@/components/forms/login";
import { LoginFormSchema } from "@/components/forms/login/validations";

import { LOGIN_FIELDS } from "@/lib/utils/auth.utils";
import { LoginFormShape, LoginHandlerResult } from "@/types/auth.types";
import { redirect } from "next/navigation";
import {
  ApiErrorPayload,
  extractApiErrorMessage,
  extractFieldErrors,
  persistResponseCookies,
  resolveApiEndpoint,
  withFormState,
} from "./helpers";

const LOGIN_GENERIC_ERROR =
  "Unable to sign you in right now. Please try again.";

function asText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function readLoginForm(formData: FormData): LoginFormShape {
  return {
    email: asText(formData.get("email")),
    password: asText(formData.get("password")),
  } satisfies LoginFormShape;
}

const loginAction = withFormState<LoginFormShape, LoginHandlerResult>(
  readLoginForm,
  async (form) => {
    const validated = LoginFormSchema.safeParse(form);

    if (!validated.success) {
      return {
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const endpoint = await resolveApiEndpoint("/api/login");

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
      console.error("Login request failed", error);
      return {
        errors: {
          general: [LOGIN_GENERIC_ERROR],
        },
      };
    }

    if (!response.ok) {
      const payload: ApiErrorPayload | null = await response
        .json()
        .catch(() => null);

      const fieldErrors = extractFieldErrors(LOGIN_FIELDS, payload?.details);
      const generalError =
        extractApiErrorMessage(payload) ||
        `Login failed with status ${response.status}`;

      return {
        errors: {
          ...fieldErrors,
          general: [generalError || LOGIN_GENERIC_ERROR],
        },
      };
    }

    await persistResponseCookies(response.headers.get("set-cookie"));

    redirect("/dashboard");
  }
);

export const login: (
  state: LoginFormStateType,
  formData: FormData
) => Promise<LoginFormStateType> = loginAction;
