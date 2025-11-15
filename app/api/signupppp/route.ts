import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { ZodError, z } from "zod"
import { prisma } from "@/lib/prisma"

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const validatedData = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create user and associated auth record
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        auths: {
          create: {
            provider: "NORMAL",
            password: hashedPassword,
          }
        }
      }
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    }, { status: 201 })

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
