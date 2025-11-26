import { LoginFormSchema } from "@/components/forms/login/validations";
import { LOGIN_FIELDS } from "@/lib/utils/auth.utils";
import z from "zod";

export type LoginField = (typeof LOGIN_FIELDS)[number];
export type LoginFormShape = z.infer<typeof LoginFormSchema>;
export type LoginFormErrors = Partial<Record<LoginField | "general", string[]>>;
export type LoginHandlerResult = { errors?: LoginFormErrors };
