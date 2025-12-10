import { LoginFormShape } from "@/components/forms/login/validations";
import { LOGIN_FIELDS } from "@/lib/utils/auth.utils";

export type LoginField = (typeof LOGIN_FIELDS)[number];
export type LoginFormErrors = Partial<Record<LoginField | "general", string[]>>;
export type LoginHandlerResult = { errors?: LoginFormErrors };
