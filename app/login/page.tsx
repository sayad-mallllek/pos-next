import LoginForm from "@/components/forms/login";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-4 sm:p-6 lg:p-8">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Access your account</CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
}
