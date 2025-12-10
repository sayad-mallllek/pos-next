import type { ForgotPasswordFormShape } from "./validations";

type ForgotPasswordErrors = Partial<
  Record<keyof ForgotPasswordFormShape | "general", string[]>
>;

export type ForgotPasswordFormStateType =
  | {
      errors?: ForgotPasswordErrors;
      success?: boolean;
      form: ForgotPasswordFormShape;
    }
  | undefined;
