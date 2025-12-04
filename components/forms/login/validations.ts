import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Please provide a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
