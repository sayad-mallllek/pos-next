import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
            <span className="text-lg font-bold text-black">P</span>
          </div>
          <span className="text-lg font-semibold text-white">POS System</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#docs"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Documentation
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-white text-black hover:bg-gray-200">
            <Link href="/signup">Start for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
