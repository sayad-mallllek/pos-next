import {
  Zap,
  Shield,
  BarChart3,
  Sparkles,
  Check,
  MessageSquare,
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="bg-forest-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Built for the intelligence age
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-forest-300/70">
            Integrate AI into every part of your business lifecycle. Woven into
            how your inventory is managed, maintained, and understood by both
            users and systems.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Card 1 - Real-time Sync */}
          <div className="group rounded-2xl border border-forest-500/10 bg-forest-900/50 p-8 transition-all hover:border-forest-500/30">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-400">
              Real-time & Fast
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Built for both people and AI
            </h3>
            <p className="mt-2 text-forest-300/70">
              Ensure your product shows up in the workflows users already rely
              on. We support real-time sync, offline mode, and whatever comes
              next.
            </p>

            {/* Visual */}
            <div className="mt-8 rounded-xl bg-forest-950 p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-forest-400" />
                <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-forest-500 via-forest-400 to-forest-500">
                  <div className="h-full w-1/3 rounded-full bg-forest-800" />
                </div>
                <Zap className="h-5 w-5 text-forest-400" />
              </div>
              <div className="mt-3 space-y-2">
                <div className="h-2 w-2/3 rounded bg-forest-800" />
                <div className="h-2 w-full rounded bg-forest-800" />
              </div>
            </div>
          </div>

          {/* Card 2 - Self-updating */}
          <div className="group rounded-2xl border border-forest-500/10 bg-forest-900/50 p-8 transition-all hover:border-forest-500/30">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-400">
              Inventory
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Self-updating inventory management
            </h3>
            <p className="mt-2 text-forest-300/70">
              Track, edit, and maintain inventory with a context-aware system.
              Move faster and more consistently without manual overhead.
            </p>

            {/* Visual */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-500">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-500">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-500/60">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-forest-600">
                <div className="h-6 w-6 rounded-full border-2 border-forest-500 border-t-transparent animate-spin" />
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Card */}
        <div className="mt-6 rounded-2xl border border-forest-500/10 bg-forest-900/50 p-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-400">
              Assistant
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Intelligent assistance for your users
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-forest-300/70">
              Turn every transaction into a guided experience. Your AI assistant
              understands context and delivers what customers need.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-8 flex flex-col sm:grid grid-cols-12 gap-4 rounded-xl bg-forest-950 p-6">
            {/* Left Column */}
            <div className="flex flex-col items-center sm:items-start col-span-3 gap-3">
              <div className="flex items-center gap-2 text-xs text-forest-400/70">
                <span>📖</span> QUICK START GUIDE
              </div>
              <div className="h-2 w-full rounded bg-forest-800" />
              <div className="h-2 w-3/4 rounded bg-forest-800" />
              <div className="flex gap-2 pt-2">
                <div className="h-8 w-12 rounded bg-forest-800" />
                <div className="h-8 w-12 rounded bg-forest-800" />
                <div className="h-8 w-12 rounded bg-forest-800" />
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-forest-400/70">
                <span>💎</span> POS SERVER
              </div>
              <div className="h-2 w-full rounded bg-forest-800" />
              <div className="h-2 w-2/3 rounded bg-forest-800" />

              <div className="mt-4 flex items-center gap-2 text-xs text-forest-400/70">
                <span>📦</span> UPDATES
              </div>
              <div className="h-6 w-20 rounded bg-forest-800" />
            </div>

            {/* Middle Column */}
            <div className="col-span-5 space-y-3">
              <div className="h-12 rounded-lg bg-forest-500" />
              <div className="h-8 rounded-lg bg-forest-800" />
              <div className="h-12 rounded-lg bg-forest-500" />
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-forest-800 px-3 py-2">
                <MessageSquare className="h-4 w-4 text-forest-400/70" />
                <span className="text-sm text-forest-400/70">
                  Ask AI anything...
                </span>
                <div className="ml-auto h-5 w-5 rounded-full bg-forest-500" />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-3">
              <div className="rounded-lg border border-forest-500/30 p-3">
                <div className="flex items-center gap-2 text-xs text-forest-400">
                  <span>📊</span> API REFERENCE
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded bg-forest-500" />
                    <div className="h-2 w-12 rounded bg-forest-500/60" />
                    <div className="h-6 w-6 rounded bg-forest-500" />
                  </div>
                  <div className="h-2 w-full rounded bg-forest-500/80" />
                  <div className="h-2 w-3/4 rounded bg-forest-500/60" />
                  <div className="h-2 w-full rounded bg-forest-500/70" />
                  <div className="h-2 w-2/3 rounded bg-forest-500/50" />
                </div>
              </div>

              <div className="rounded-lg bg-forest-800 p-3">
                <div className="flex items-center gap-2 text-xs text-forest-400/70">
                  <BarChart3 className="h-4 w-4" /> INSIGHTS
                </div>
                <div className="mt-3 flex items-end gap-1">
                  {[40, 60, 30, 80, 50, 70, 90, 45, 65].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-t bg-forest-600"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
