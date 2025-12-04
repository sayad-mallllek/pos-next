"use server";

import { LoginFormStateType } from "@/components/forms/login";
import { LoginFormSchema } from "@/components/forms/login/validations";

import { LOGIN_FIELDS } from "@/lib/utils/auth.utils";
import { LoginFormShape, LoginHandlerResult } from "@/types/auth.types";
import { withFormState } from "./helpers";
import { authClient } from "@/lib/better-auth";

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

    const response = await authClient.signIn.email({
      email: validated.data.email,
      password: validated.data.password,
      callbackURL: "/dashboard",
      rememberMe: true,
    });

    if (response.error)
      return {
        errors: {
          general: [response.error.message || LOGIN_GENERIC_ERROR],
        },
      };
  }
);

export const login: (
  state: LoginFormStateType,
  formData: FormData
) => Promise<LoginFormStateType> = loginAction;
