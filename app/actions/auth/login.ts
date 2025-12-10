"use server";
import "server-only";

import { LoginFormStateType } from "@/components/forms/login";
import { validateLoginForm } from "@/components/forms/login/validations";

import { auth } from "@/lib/better-auth";
import { LoginFormShape, LoginHandlerResult } from "@/types/auth.types";
import { headers } from "next/headers";
import { tryCatch, withFormState } from "./helpers";

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
    const validated = validateLoginForm(form);

    if (!validated.success) {
      return { errors: validated.errors };
    }

    const { response, error } = await tryCatch(async () =>
      auth.api.signInEmail({
        body: {
          email: validated.data.email,
          password: validated.data.password,
          callbackURL: "/dashboard",
          rememberMe: true,
        },
        headers: await headers(),
      })
    );

    if (error || !response)
      return {
        errors: {
          general: [error.message || LOGIN_GENERIC_ERROR],
        },
      };
  }
);

export const login: (
  state: LoginFormStateType,
  formData: FormData
) => Promise<LoginFormStateType> = loginAction;
