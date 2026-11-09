"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PricingTier } from "@/types"

const PRICING_TIERS: readonly PricingTier[] = [
  {
    name: "Starter",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    isFeatured: false,
    cta: "Choose This Plan",
    href: "/register",
  },
  {
    name: "Growth",
    priceMonthly: "$17",
    priceYearly: "$13",
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    isFeatured: true,
    badge: "Most Popular",
    cta: "Choose This Plan",
    href: "/register",
  },
  {
    name: "Premium",
    priceMonthly: "$99",
    priceYearly: "$79",
    description: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    isFeatured: false,
    cta: "Choose This Plan",
    href: "/register",
  },
] as const

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Pay for the leverage, not the listings
          </h2>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-[#0c0c0e] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  !isYearly
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  isYearly
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                )}
              >
                <span>Yearly</span>
                <span className="rounded-full border border-[#5c53fe]/40 bg-[#5c53fe]/20 px-2 py-0.5 text-xs font-semibold text-[#5c53fe]">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Tier Cards */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300",
                tier.isFeatured
                  ? "border-2 border-[#5c53fe] bg-linear-to-b from-[#141226] to-[#0c0c0e] shadow-[0_0_40px_rgba(92,83,254,0.35)] lg:-translate-y-2"
                  : "border border-white/10 bg-[#0c0c0e] hover:border-white/20 hover:bg-[#111114]"
              )}
            >
              {tier.isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#5c53fe] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(92,83,254,0.5)]">
                  {tier.badge}
                </div>
              )}

              <div>
                {/* Title & Price */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-xl font-medium text-white/90">
                    {tier.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      {isYearly ? tier.priceYearly : tier.priceMonthly}
                    </span>
                    <span className="text-sm font-normal text-white/60">
                      /month
                    </span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-sm font-medium text-white/80">
                    {tier.description}
                  </p>
                  <ul className="mt-4 flex flex-col gap-3.5">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-white/70"
                      >
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/15 text-[#5c53fe]">
                          <Check className="size-3.5 stroke-[2.5]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-4">
                <Link
                  href={tier.href}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200",
                    tier.isFeatured
                      ? "bg-[#5c53fe] text-white shadow-[0_0_20px_rgba(92,83,254,0.45)] hover:bg-[#5c53fe]/90 hover:shadow-[0_0_30px_rgba(92,83,254,0.65)]"
                      : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                  )}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
