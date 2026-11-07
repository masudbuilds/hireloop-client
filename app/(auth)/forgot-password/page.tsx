"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeftIcon, CheckCircle2Icon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const FIELD_CLASSES =
  "h-11 rounded-lg border-white/15 bg-[#101010] px-3.5 text-[15px] text-white placeholder:text-white/40 hover:border-white/25 focus-visible:border-[#5c53fe] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/30"

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  // Event handler that collects form data on submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Forgot Password requested for:", { email })

    // Set submitted state for UI feedback
    setSubmitted(true)

    // TODO: Integrate password reset functionality later
    // e.g. await authClient.forgetPassword({ email, redirectTo: "/reset-password" })
  }

  return (
    <div className="relative z-10 flex w-full max-w-md flex-col gap-6 rounded-2xl border border-white/10 bg-[#151516] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:p-8">
      {/* Back button */}
      <div>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeftIcon className="size-4" />
          Back to sign in
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
          Reset password
        </h1>
        <p className="text-sm text-white/60">
          Enter your email address and we&apos;ll send you instructions to reset your
          password.
        </p>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-[#101010] p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#5c53fe]/20 text-[#5c53fe]">
            <CheckCircle2Icon className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-white">
              Check your inbox
            </h2>
            <p className="text-xs text-white/60">
              We&apos;ve sent a password reset link to{" "}
              <span className="text-white font-medium">{email}</span>.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="mt-2 h-10 w-full rounded-lg border-white/15 bg-transparent text-sm text-white hover:bg-white/10"
          >
            Resend email
          </Button>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-white/70">
              Email address
            </label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={FIELD_CLASSES}
              />
              <MailIcon className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#5c53fe] text-[15px] font-medium text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] hover:bg-[#5c53fe]/90 transition-all cursor-pointer"
          >
            Send Reset Instructions
          </Button>
        </form>
      )}

      {/* Footer link */}
      <p className="text-center text-sm text-white/60">
        Remember your password?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#5c53fe] transition-colors hover:text-[#7c74ff] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
