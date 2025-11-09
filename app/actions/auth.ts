"use server";

import { SignupFormStateType } from "@/components/forms/signup";
import { SignupFormSchema } from "@/components/forms/signup/validations";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import z from "zod";

export async function signup(
  state: SignupFormStateType,
  formData: FormData
): Promise<SignupFormStateType> {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      form: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      errors: validatedFields.error.flatten().fieldErrors as Partial<
        Record<keyof z.infer<typeof SignupFormSchema>, string[]>
      >,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        form: { name, email, password },
        errors: {
          email: ["A user with this email already exists"],
        },
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created successfully:", email);
  } catch (error) {
    console.error("Signup error:", error);
    return {
      form: { name, email, password },
      errors: {
        email: ["An error occurred while creating your account. Please try again."],
      },
    };
  }

  // Redirect to login page after successful signup
  redirect("/login");
}
