import { type } from "arktype";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginFormSchema = type({
  email: "string",
  password: "string",
});

export type LoginFormShape = typeof LoginFormSchema.infer;

export function validateLoginForm(form: LoginFormShape) {
  const errors: Partial<Record<keyof LoginFormShape, string[]>> = {};

  if (!emailRegex.test(form.email)) {
    errors.email = ["Please provide a valid email."];
  }

  if (form.password.length < 6) {
    errors.password = ["Password must be at least 6 characters."];
  }

  const success = Object.keys(errors).length === 0;
  return success
    ? { success: true as const, data: form }
    : { success: false as const, errors };
}
