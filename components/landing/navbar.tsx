import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-forest-500/10 bg-forest-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            alt="fireflyee-logo-new-transparent"
            height={30}
            width={53}
            src={"/images/fireflyee-logo-new-transparent.png"}
          />
          <span className="text-sm sm:text-lg font-semibold text-white">
            FireFlyee
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-forest-300/70 transition-colors hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#docs"
            className="text-sm text-forest-300/70 transition-colors hover:text-white"
          >
            Documentation
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-forest-300/70 transition-colors hover:text-white"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-forest-200 hover:bg-forest-500/10 hover:text-white"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            className="bg-forest-500 text-white hover:bg-forest-400"
          >
            <Link href="/signup">Start for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
