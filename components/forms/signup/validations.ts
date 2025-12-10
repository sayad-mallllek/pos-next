import { type } from "arktype";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignupFormSchema = type({
  name: "string",
  email: "string",
  password: "string",
});

export type SignupFormShape = typeof SignupFormSchema.infer;

export function validateSignupForm(form: SignupFormShape) {
  const errors: Partial<Record<keyof SignupFormShape, string[]>> = {};

  const name = form.name?.trim();
  if (!name || name.length < 2) {
    errors.name = ["Name must be at least 2 characters long."];
  }

  const email = form.email?.trim();
  if (!emailRegex.test(email)) {
    errors.email = ["Please enter a valid email."];
  }

  const password = form.password?.trim() ?? "";
  const passwordErrors: string[] = [];
  if (password.length < 8) passwordErrors.push("Be at least 8 characters long");
  if (!/[a-zA-Z]/.test(password))
    passwordErrors.push("Contain at least one letter.");
  if (!/[0-9]/.test(password))
    passwordErrors.push("Contain at least one number.");
  if (!/[^a-zA-Z0-9]/.test(password))
    passwordErrors.push("Contain at least one special character.");
  if (passwordErrors.length) {
    errors.password = passwordErrors;
  }

  const success = Object.keys(errors).length === 0;
  // return trimmed values on success to keep UI clean
  const data: SignupFormShape = success ? { name, email, password } : form;

  return success
    ? { success: true as const, data }
    : { success: false as const, errors };
}
