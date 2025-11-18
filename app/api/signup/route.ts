import { SignupFormSchema } from "@/components/forms/signup/validations";
import { authClient } from "@/lib/better-auth";

import { NextResponse } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

export async function POST(req: Request) {
  const body: z.infer<typeof SignupFormSchema> = await req.json();

  const validatedData = signupSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validatedData.error.issues },
      { status: _statusCode.UNPROCESSABLE_ENTITY }
    );
  }

  const { data, error } = await authClient.signUp.email({
    email: validatedData.data.email,
    password: validatedData.data.password,
    name: validatedData.data.name,
    callbackURL: "/login",
  });

  if (error) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
        },
      },
      { status: 422 }
    );
  }

  console.log("Signup response data:", data);

  return NextResponse.json({ message: "Signup successful" }, { status: 201 });
}
