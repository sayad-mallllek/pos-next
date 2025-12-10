import { type } from "arktype";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgotPasswordFormSchema = type({
  email: "string",
});

export type ForgotPasswordFormShape = typeof ForgotPasswordFormSchema.infer;

export function validateForgotPasswordForm(form: ForgotPasswordFormShape) {
  const errors: Partial<Record<keyof ForgotPasswordFormShape, string[]>> = {};

  if (!emailRegex.test(form.email)) {
    errors.email = ["Please provide a valid email."];
  }

  const success = Object.keys(errors).length === 0;
  return success
    ? { success: true as const, data: form }
    : { success: false as const, errors };
}
