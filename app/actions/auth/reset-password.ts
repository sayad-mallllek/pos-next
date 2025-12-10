"use server";
import "server-only";

import { ResetPasswordFormStateType } from "@/components/forms/reset-password/types";
import { ResetPasswordFormSchema } from "@/components/forms/reset-password/validations";
import { tryCatch, withFormState } from "./helpers";
import type { z } from "zod";
import { auth } from "@/lib/better-auth";
import { headers } from "next/headers";

type ResetPasswordFormShape = z.infer<typeof ResetPasswordFormSchema> & {
  token: string;
};
type ResetPasswordFormErrors = Partial<
  Record<keyof ResetPasswordFormShape | "general", string[]>
>;
type ResetPasswordHandlerResult = {
  errors?: ResetPasswordFormErrors;
  success?: boolean;
};

const RESET_PASSWORD_GENERIC_ERROR =
  "Unable to reset your password right now. Please try again.";

function asText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function readResetPasswordForm(
  formData: FormData
): Omit<ResetPasswordFormShape, "token"> {
  return {
    password: asText(formData.get("password")),
    confirmPassword: asText(formData.get("confirmPassword")),
  };
}

const resetPasswordAction = withFormState<
  Omit<ResetPasswordFormShape, "token">,
  ResetPasswordHandlerResult
>(readResetPasswordForm, async (form, formData) => {
  const token = asText(formData.get("token"));

  if (!token) {
    return {
      errors: {
        token: ["Invalid or missing reset token. Please request a new link."],
      },
    };
  }

  const validated = ResetPasswordFormSchema.safeParse(form);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { response, error } = await tryCatch(async () =>
    auth.api.resetPassword({
      body: {
        newPassword: validated.data.password,
        token,
      },
      headers: await headers(),
    })
  );

  if (error) {
    if (
      error.message?.toLowerCase().includes("token") ||
      error.message?.toLowerCase().includes("expired")
    ) {
      return {
        errors: {
          token: [
            "This reset link has expired or is invalid. Please request a new link.",
          ],
        },
      };
    }
    return {
      errors: {
        general: [RESET_PASSWORD_GENERIC_ERROR],
      },
    };
  }

  return { success: true };
});

export const resetPassword: (
  state: ResetPasswordFormStateType,
  formData: FormData
) => Promise<ResetPasswordFormStateType> = resetPasswordAction;
