"use server";
import "server-only";

import { ForgotPasswordFormStateType } from "@/components/forms/forgot-password/types";
import {
  ForgotPasswordFormShape,
  validateForgotPasswordForm,
} from "@/components/forms/forgot-password/validations";
import { tryCatch, withFormState } from "./helpers";
import { auth } from "@/lib/better-auth";
import { headers } from "next/headers";

type ForgotPasswordFormErrors = Partial<
  Record<keyof ForgotPasswordFormShape | "general", string[]>
>;
type ForgotPasswordHandlerResult = {
  errors?: ForgotPasswordFormErrors;
  success?: boolean;
};

const FORGOT_PASSWORD_GENERIC_ERROR =
  "Unable to process your request right now. Please try again.";

function asText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function readForgotPasswordForm(formData: FormData): ForgotPasswordFormShape {
  return {
    email: asText(formData.get("email")),
  } satisfies ForgotPasswordFormShape;
}

const forgotPasswordAction = withFormState<
  ForgotPasswordFormShape,
  ForgotPasswordHandlerResult
>(readForgotPasswordForm, async (form) => {
  const validated = validateForgotPasswordForm(form);

  if (!validated.success) {
    return {
      errors: validated.errors,
    };
  }

  const { response, error } = await tryCatch(async () =>
    auth.api.forgetPassword({
      body: {
        email: validated.data.email,
        redirectTo: "/reset-password",
      },
      headers: await headers(),
    })
  );

  if (error) {
    // Don't reveal if email exists or not for security
    // Always show success message
    return { success: true };
  }

  return { success: true };
});

export const forgotPassword: (
  state: ForgotPasswordFormStateType,
  formData: FormData
) => Promise<ForgotPasswordFormStateType> = forgotPasswordAction;
