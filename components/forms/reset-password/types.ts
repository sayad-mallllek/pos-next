import type { ResetPasswordFormShape } from "./validations";

type ResetPasswordErrors = Partial<
  Record<keyof ResetPasswordFormShape | "general" | "token", string[]>
>;

export type ResetPasswordFormStateType =
  | {
      errors?: ResetPasswordErrors;
      success?: boolean;
      form: ResetPasswordFormShape;
    }
  | undefined;
