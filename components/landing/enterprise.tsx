import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Enterprise() {
  return (
    <section className="bg-dark py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Enterprise-Ready
            </span>
            <h2 className="mt-4 max-w-lg text-4xl font-bold text-white">
              Bring intelligence to enterprise operations
            </h2>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-gray-200"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
