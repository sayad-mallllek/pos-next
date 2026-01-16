import { Logo } from "@/components/landing/logo";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col bg-white px-6 py-8 lg:w-1/2 lg:px-16 lg:py-12 items-center">
        {/* Logo */}
        <div className="mb-12 sm:mb-32">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold text-gray-900">
              FireFlyee
            </span>
          </Link>
        </div>

        {/* Form content */}
        <div className="w-full max-w-md">{children}</div>
        <div />
      </div>

      {/* Right side - Testimonial/Placeholder */}
      <div className="hidden w-1/2 flex-col items-center justify-center  bg-gray-50 p-12 lg:flex bg-[url('/assets/images/blue-forest.jpg')] bg-cover" />
    </div>
  );
}
