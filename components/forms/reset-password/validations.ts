import { type } from "arktype";

export const ResetPasswordFormSchema = type({
  password: "string",
  confirmPassword: "string",
});

export type ResetPasswordFormShape = typeof ResetPasswordFormSchema.infer;

export function validateResetPasswordForm(form: ResetPasswordFormShape) {
  const errors: Partial<Record<keyof ResetPasswordFormShape, string[]>> = {};

  const password = form.password ?? "";
  const passwordErrors: string[] = [];
  if (password.length < 8) passwordErrors.push("Be at least 8 characters long");
  if (!/[a-zA-Z]/.test(password))
    passwordErrors.push("Contain at least one letter");
  if (!/[0-9]/.test(password))
    passwordErrors.push("Contain at least one number");
  if (!/[^a-zA-Z0-9]/.test(password))
    passwordErrors.push("Contain at least one special character");
  if (passwordErrors.length) {
    errors.password = passwordErrors;
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = ["Passwords don't match"];
  }

  const success = Object.keys(errors).length === 0;
  return success
    ? { success: true as const, data: form }
    : { success: false as const, errors };
}
