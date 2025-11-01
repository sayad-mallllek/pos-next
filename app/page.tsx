import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            POS Backend System
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with Next.js App Router, Prisma, NextAuth, and ShadCN UI
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Secure login and signup</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>NextAuth integration with credentials provider</li>
                <li>Password hashing with bcryptjs</li>
                <li>Form validation using Zod</li>
                <li>Session management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database</CardTitle>
              <CardDescription>Prisma ORM with SQLite</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>Type-safe database access</li>
                <li>Automatic migrations</li>
                <li>User model with authentication</li>
                <li>Easy to switch to PostgreSQL/MySQL</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UI Components</CardTitle>
              <CardDescription>ShadCN UI with Tailwind CSS</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>Beautiful pre-built components</li>
                <li>Fully customizable with Tailwind</li>
                <li>Accessible and responsive</li>
                <li>Dark mode support ready</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type Safety</CardTitle>
              <CardDescription>End-to-end TypeScript</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>TypeScript throughout the stack</li>
                <li>Runtime validation with Zod</li>
                <li>Type-safe API routes</li>
                <li>Improved developer experience</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
