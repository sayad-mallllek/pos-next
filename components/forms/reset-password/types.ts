import type { z } from "zod";
import type { ResetPasswordFormSchema } from "./validations";

type ResetPasswordErrors = Partial<
  Record<
    keyof z.infer<typeof ResetPasswordFormSchema> | "general" | "token",
    string[]
  >
>;

export type ResetPasswordFormStateType =
  | {
      errors?: ResetPasswordErrors;
      success?: boolean;
      form: Omit<z.infer<typeof ResetPasswordFormSchema>, "token">;
    }
  | undefined;
