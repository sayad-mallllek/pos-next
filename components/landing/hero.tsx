import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Fireflies } from "./fireflies";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-forest-950 pt-16">
      {/* Background Image with Overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/images/blue-forest.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-900/60 to-forest-950" />
      </div>

      {/* Fireflies Effect */}
      <Fireflies count={35} />

      {/* Aurora Background Effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main aurora glow */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-b from-forest-500/30 via-forest-600/20 to-transparent blur-[120px]" />
        {/* Secondary glow */}
        <div className="absolute right-1/4 top-20 h-[400px] w-[600px] rounded-full bg-gradient-to-bl from-forest-400/20 via-forest-500/10 to-transparent blur-[100px]" />
        {/* Left accent */}
        <div className="absolute -left-20 top-40 h-[500px] w-[400px] rounded-full bg-gradient-to-r from-forest-600/15 via-forest-500/5 to-transparent blur-[80px]" />
        {/* Stars/particles */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RhcnMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjMpIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzMCIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMCIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMjUpIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNTAiIHI9IjAuNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIi8+PGNpcmNsZSBjeD0iMTgwIiBjeT0iODAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4zKSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMTAwIiByPSIwLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMTUwIiByPSIwLjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yNSkiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSIxMzAiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIi8+PGNpcmNsZSBjeD0iMTcwIiBjeT0iMTcwIiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RhcnMpIi8+PC9zdmc+')] opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-24 text-center md:pt-32">
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
          The Modern
          <br />
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            POS Platform
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
          Meet the next generation of point-of-sale systems. AI-native,
          beautiful out-of-the-box, and built for modern businesses.
        </p>

        {/* CTA Input */}
        <div className="mt-10 flex w-full justify-between max-w-md items-center gap-2 rounded-full bg-forest-900/50 p-1.5 ring-1 ring-forest-500/20 backdrop-blur-sm">
          <input
            type="email"
            placeholder="Email address"
            className="w-30 bg-transparent px-4 py-2 text-sm text-white placeholder-forest-300/50 outline-none"
          />
          <Link className="grow flex justify-end" href="/signup">
            <Button className="ml-auto rounded-full bg-forest-500 px-6 text-white hover:bg-forest-400">
              Start now
            </Button>
          </Link>
        </div>

        {/* Preview Card */}
        <div className="mt-16 w-full max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-forest-500/20 bg-forest-900/80 shadow-2xl backdrop-blur-sm">
            {/* Window Header */}
            <div className="flex items-center gap-2 border-b border-forest-500/20 bg-forest-950/80 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-forest-300/60">
                  POS Dashboard
                </span>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex flex-col sm:grid grid-cols-12 gap-4 p-4">
              {/* Sidebar */}
              <div className="flex gap-2 overflow-hidden sm:block col-span-3 space-y-3">
                <div className="flex items-center gap-2 rounded-lg bg-forest-500/20 px-3 py-2">
                  <div className="h-4 w-4 rounded bg-forest-500" />
                  <span className="text-sm text-forest-300">Dashboard</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-forest-400/60">
                  <div className="h-4 w-4 rounded bg-forest-700" />
                  <span className="text-sm">Products</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-forest-400/60">
                  <div className="h-4 w-4 rounded bg-forest-700" />
                  <span className="text-sm">Orders</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-forest-400/60">
                  <div className="h-4 w-4 rounded bg-forest-700" />
                  <span className="text-sm">Analytics</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-6 space-y-4">
                <div className="h-24 rounded-lg bg-gradient-to-r from-forest-500 to-forest-400" />
                <div className="h-8 rounded-lg bg-forest-800/50" />
                <div className="h-20 rounded-lg bg-forest-500/80" />
              </div>

              {/* Right Panel */}
              <div className="col-span-3 space-y-3 rounded-lg border border-forest-500/30 p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-forest-300">📊 SALES</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-forest-500" />
                  <div className="h-2 w-3/4 rounded bg-forest-500/70" />
                  <div className="h-2 w-1/2 rounded bg-forest-500/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
