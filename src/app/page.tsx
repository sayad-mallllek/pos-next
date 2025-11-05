import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 text-center p-8">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Point of Sale System
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
          A modern, responsive POS system with cart management, payments, and receipt generation.
        </p>
        <Link
          href="/register"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-white transition-colors hover:bg-blue-700"
        >
          Open Register
        </Link>
      </main>
    </div>
  );
}
