"use server";

import { ResetPasswordFormStateType } from "@/components/forms/reset-password/types";
import { ResetPasswordFormSchema } from "@/components/forms/reset-password/validations";
import { withFormState } from "./helpers";
import type { z } from "zod";
import { authClient } from "@/lib/better-auth";

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

  try {
    const response = await authClient.resetPassword({
      newPassword: validated.data.password,
      token,
    });

    if (response.error) {
      // Check for specific error types
      if (
        response.error.message?.toLowerCase().includes("token") ||
        response.error.message?.toLowerCase().includes("expired")
      ) {
        return {
          errors: {
            token: [
              "This reset link has expired or is invalid. Please request a new one.",
            ],
          },
        };
      }

      return {
        errors: {
          general: [response.error.message || RESET_PASSWORD_GENERIC_ERROR],
        },
      };
    }

    return { success: true };
  } catch {
    return {
      errors: {
        general: [RESET_PASSWORD_GENERIC_ERROR],
      },
    };
  }
});

export const resetPassword: (
  state: ResetPasswordFormStateType,
  formData: FormData
) => Promise<ResetPasswordFormStateType> = resetPasswordAction;
