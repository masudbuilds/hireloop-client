"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, CreditCard, Lock } from "lucide-react"

export default function PaymentPage({
  searchParams,
}: {
  searchParams?: Promise<{ canceled?: string }>
}) {
  const resolvedParams = searchParams ? React.use(searchParams) : undefined
  const canceled = resolvedParams?.canceled

  React.useEffect(() => {
    if (canceled) {
      console.log(
        "Order canceled -- continue to shop around and check out when you're ready."
      )
    }
  }, [canceled])

  const [currency, setCurrency] = React.useState<"BDT" | "USD">("BDT")

  return (
    <main className="min-h-screen bg-[#090a0f] text-white">
      {/* Top Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            <span>Back to jobs</span>
          </Link>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold tracking-wider text-amber-400">
            SANDBOX
          </span>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Order Summary */}
          <section className="lg:col-span-5">
            <h2 className="text-xs font-bold tracking-wider text-white/50">
              CHOOSE A CURRENCY:
            </h2>

            {/* Currency Selectors */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCurrency("BDT")}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                  currency === "BDT"
                    ? "border-[#5c53fe] bg-[#5c53fe]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Bangladesh Flag */}
                <span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#006a4e]">
                  <span className="size-3 rounded-full bg-[#f42a41]" />
                </span>
                <span className="text-sm font-semibold">BDT 2,553.33</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                  currency === "USD"
                    ? "border-[#5c53fe] bg-[#5c53fe]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* USA Flag */}
                <span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#3c3b6e] text-[9px] font-bold text-white">
                  🇺🇸
                </span>
                <span className="text-sm font-semibold">$20.00</span>
              </button>
            </div>

            <p className="mt-2 text-xs text-white/40 italic">
              1 USD = 127.6665 BDT
            </p>

            <div className="my-6 border-t border-white/10" />

            {/* Plan Info */}
            <div>
              <h3 className="text-xl font-semibold">Hireloop Pro Plan</h3>
              <p className="mt-1 text-sm text-white/50">
                Access to all features
              </p>
              <div className="mt-4 text-2xl font-bold">
                {currency === "BDT" ? "BDT 2,553.33" : "$20.00"}
                <span className="text-sm font-normal text-white/50">
                  {" "}
                  / month
                </span>
              </div>
            </div>
          </section>

          {/* Right Column: Payment Form */}
          <section className="rounded-2xl border border-white/10 bg-[#101118] p-6 sm:p-8 lg:col-span-7">
            {/* Express Checkout: Link */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-between rounded-xl bg-[#00d66f] px-5 font-semibold text-[#090a0f] transition-opacity hover:opacity-90"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight">link</span>
              </span>
              <span className="flex items-center gap-2 text-xs font-medium">
                <span className="rounded bg-black/10 px-1.5 py-0.5 font-bold">
                  VISA
                </span>
                •••• 4242
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative bg-[#101118] px-3 text-xs font-semibold text-white/40">
                OR
              </span>
            </div>

            <div className="space-y-5">
              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-semibold text-white/90">
                  Contact information
                </h4>
                <div className="mt-2">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    defaultValue="masudrana.arh@gmail.com"
                    className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-sm font-semibold text-white/90">
                  Payment method
                </h4>

                <div className="mt-2 rounded-xl border border-white/15 bg-white/5">
                  {/* Card Header tab */}
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-white">
                    <CreditCard className="size-4 text-[#5c53fe]" />
                    <span>Card</span>
                  </div>

                  {/* Card Inputs */}
                  <div className="space-y-3 p-4">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-white/50">
                        CARD INFORMATION
                      </span>
                      <div className="mt-1.5 flex h-11 items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3.5 focus-within:border-[#5c53fe]">
                        <input
                          type="text"
                          placeholder="1234 1234 1234 1234"
                          className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                        />
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60">
                          <span className="rounded bg-white/10 px-1 py-0.5">
                            VISA
                          </span>
                          <span className="rounded bg-white/10 px-1 py-0.5">
                            MC
                          </span>
                          <span className="rounded bg-white/10 px-1 py-0.5">
                            AMEX
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="h-11 rounded-lg border border-white/10 bg-black/30 px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="h-11 rounded-lg border border-white/10 bg-black/30 px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-white/50">
                        CARDHOLDER NAME
                      </span>
                      <input
                        type="text"
                        placeholder="Full name on card"
                        className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-white/50">
                        COUNTRY OR REGION
                      </span>
                      <div className="mt-1.5 flex h-11 items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3.5 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#006a4e]">
                            <span className="size-2 rounded-full bg-[#f42a41]" />
                          </span>
                          <span>Bangladesh</span>
                        </div>
                        <ChevronDown className="size-4 text-white/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Information */}
              <label className="flex cursor-pointer items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 size-4 rounded border-white/20 bg-white/5 accent-[#5c53fe]"
                />
                <div>
                  <span className="text-sm font-medium text-white/90">
                    Save my information for faster checkout
                  </span>
                  <p className="text-xs text-white/40">
                    Pay securely on this site and everywhere Link is accepted.
                  </p>
                </div>
              </label>

              {/* Pay Button */}

              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <button
                    type="submit"
                    role="link"
                    className="h-12 w-full rounded-xl bg-[#5c53fe] text-base font-semibold text-white shadow-[0_0_25px_rgba(92,83,254,0.4)] transition-all hover:bg-[#5c53fe]/90"
                  >
                    Checkout {currency === "BDT" ? "BDT 2,553.33" : "$20.00"}
                  </button>
                </section>
              </form>

              {/* Footer */}
              <div className="flex flex-col items-center justify-center gap-2 pt-2 text-xs text-white/40 sm:flex-row">
                <span className="flex items-center gap-1.5">
                  <Lock className="size-3" /> Powered by Stripe
                </span>
                <span className="hidden sm:inline">·</span>
                <div className="flex gap-2">
                  <span className="cursor-pointer hover:underline">Terms</span>
                  <span>·</span>
                  <span className="cursor-pointer hover:underline">
                    Privacy
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
