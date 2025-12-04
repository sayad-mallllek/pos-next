import { z } from "zod";

export const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Be at least 8 characters long")
      .regex(/[a-zA-Z]/, "Contain at least one letter")
      .regex(/[0-9]/, "Contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
