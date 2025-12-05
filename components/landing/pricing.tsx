import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const proFeatures = [
  "Up to 6,000 products",
  "Unlimited transactions",
  "Real-time inventory sync",
  "AI-powered insights",
  "Priority email support",
  "Advanced analytics dashboard",
  "Multi-device access",
  "Automated backups",
];

const enterpriseFeatures = [
  "Unlimited products",
  "Dedicated account manager",
  "Custom integrations",
  "On-premise deployment",
  "24/7 phone support",
  "SLA guarantee",
  "Custom training",
  "API access",
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-forest-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-400">
            Pricing
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-forest-300/70">
            Choose the plan that fits your business. No hidden fees, no
            surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          {/* Pro Card - Larger with meteor border effect */}
          <div className="relative w-full max-w-sm scale-100 lg:scale-110">
            {/* Meteor border container */}
            <div className="absolute -inset-[1px] overflow-hidden rounded-2xl">
              {/* Base border */}
              <div className="absolute inset-0 rounded-2xl border border-forest-500/30" />

              {/* Meteor trail effect */}
              <div className="meteor-border absolute inset-0">
                <svg
                  className="absolute h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="meteor-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="70%" stopColor="rgba(102, 192, 228, 0.3)" />
                      <stop offset="90%" stopColor="rgba(102, 192, 228, 0.8)" />
                      <stop offset="100%" stopColor="rgba(204, 234, 246, 1)" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    rx="16"
                    ry="16"
                    fill="none"
                    stroke="url(#meteor-gradient)"
                    strokeWidth="2"
                    strokeDasharray="120 1000"
                    className="animate-meteor"
                  />
                </svg>
              </div>
            </div>

            {/* Card content */}
            <div className="relative rounded-2xl border border-forest-500/20 bg-forest-900/90 p-8 backdrop-blur-sm">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-forest-400 to-forest-500 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-forest-500/30">
                  Most Popular
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-forest-200">Pro</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-white">$10</span>
                  <span className="text-forest-400">/month</span>
                </div>
                <p className="mt-2 text-sm text-forest-300/70">
                  Everything you need to grow your business
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-400/30">
                      <Check className="h-3 w-3 text-forest-300" />
                    </div>
                    <span className="text-sm text-forest-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-forest-500 to-forest-400 text-white shadow-lg shadow-forest-500/30 transition-all hover:from-forest-400 hover:to-forest-300 hover:shadow-forest-400/40"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-forest-400/60">
                14-day free trial • No credit card required
              </p>
            </div>
          </div>

          {/* Enterprise Card - Smaller */}
          <div className="w-full max-w-sm rounded-2xl border border-forest-500/20 bg-forest-900/50 p-8 backdrop-blur-sm transition-all hover:border-forest-500/40">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-forest-300">
                Enterprise
              </h3>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <p className="mt-2 text-sm text-forest-200">
                Tailored solutions for large organizations
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {enterpriseFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-500/20">
                    <Check className="h-3 w-3 text-forest-400" />
                  </div>
                  <span className="text-sm text-forest-300/80">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                asChild
                variant="outline"
                className="w-full border-forest-500/30 bg-transparent text-forest-300 hover:bg-forest-500/10 hover:text-white"
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
