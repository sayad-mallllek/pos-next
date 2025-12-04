import type { z } from "zod";
import type { ForgotPasswordFormSchema } from "./validations";

type ForgotPasswordErrors = Partial<
  Record<keyof z.infer<typeof ForgotPasswordFormSchema> | "general", string[]>
>;

export type ForgotPasswordFormStateType =
  | {
      errors?: ForgotPasswordErrors;
      success?: boolean;
      form: z.infer<typeof ForgotPasswordFormSchema>;
    }
  | undefined;
