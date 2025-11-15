"use server";

import type { SignupFormStateType } from "@/components/forms/signup";
import { SignupFormSchema } from "@/components/forms/signup/validations";
import type { LoginFormStateType } from "@/components/forms/login";
import { LoginFormSchema } from "@/components/forms/login/validations";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
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

    // Create user and auth record in a transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create the user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
        },
      });

      // Create auth record with NORMAL provider
      await tx.auth.create({
        data: {
          userId: newUser.id,
          provider: "NORMAL",
          password: hashedPassword,
        },
      });

      return newUser;
    });

    await createSession(user.id);
  } catch (error) {
    console.error("Signup error:", error);
    return {
      form: { name, email, password },
      errors: {
        email: [
          "An error occurred while creating your account. Please try again.",
        ],
      },
    };
  }

  redirect("/dashboard");
}

export async function login(
  state: LoginFormStateType,
  formData: FormData
): Promise<LoginFormStateType> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      form: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      errors: validatedFields.error.flatten().fieldErrors as Partial<
        Record<keyof z.infer<typeof LoginFormSchema>, string[]>
      >,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        auths: {
          where: { provider: "NORMAL" },
        },
      },
    });

    const authRecord = user?.auths[0];

    if (!user || !authRecord?.password) {
      return {
        form: { email, password },
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      authRecord.password
    );

    if (!isPasswordValid) {
      return {
        form: { email, password },
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id);
  } catch (error) {
    console.error("Login error:", error);
    return {
      form: { email, password },
      errors: {
        email: ["Unable to sign in right now. Please try again later."],
      },
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
