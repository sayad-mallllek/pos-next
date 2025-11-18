import { LoginFormSchema } from "@/components/forms/login/validations";
import { authClient } from "@/lib/better-auth";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);

  const validated = LoginFormSchema.safeParse(payload);

  if (!validated.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: validated.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  let setCookieHeader: string | null = null;

  const { data, error } = await authClient.signIn.email({
    email: validated.data.email,
    password: validated.data.password,
    fetchOptions: {
      onResponse(context) {
        setCookieHeader = context.response.headers.get("set-cookie");
      },
    },
  });

  if (error || !data) {
    return NextResponse.json(
      {
        error: {
          code: error?.code ?? "LOGIN_FAILED",
          message:
            error?.message ?? "Unable to sign in with provided credentials",
        },
      },
      { status: error?.status ?? 401 }
    );
  }

  const response = NextResponse.json(
    {
      message: "Login successful",
      user: data.user,
      session: data.session,
    },
    { status: 200 }
  );

  if (setCookieHeader) {
    response.headers.set("set-cookie", setCookieHeader);
  }

  return response;
}
