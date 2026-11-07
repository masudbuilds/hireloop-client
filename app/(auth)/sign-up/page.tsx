"use client"

import * as React from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  )
}

const FIELD_CLASSES =
  "h-11 rounded-lg border-white/15 bg-[#101010] px-3.5 text-[15px] text-white placeholder:text-white/40 hover:border-white/25 focus-visible:border-[#5c53fe] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/30"

export default function SignUpPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  // Handle input change and update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Event handler that collects form data on submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Form data collected
    console.log("Sign Up form submitted with data:", formData)

    // TODO: Integrate functionality later
    // e.g. await authClient.signUp.email({
    //   name: formData.name,
    //   email: formData.email,
    //   password: formData.password,
    // })
  }

  // Event handler for social sign-up
  const handleGoogleSignUp = () => {
    console.log("Google Sign Up clicked")

    // TODO: Integrate social sign-up later
    // e.g. await authClient.signIn.social({ provider: "google" })
  }

  return (
    <div className="relative z-10 flex w-full max-w-md flex-col gap-6 rounded-2xl border border-white/10 bg-[#151516] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:p-8">
      {/* Mode toggle */}
      <div
        role="tablist"
        aria-label="Authentication mode"
        className="grid grid-cols-2 gap-1 rounded-xl bg-[#101010] p-1"
      >
        <Link
          href="/sign-in"
          className="rounded-lg py-2 text-center text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg bg-[#5c53fe] py-2 text-center text-sm font-medium text-white transition-colors"
        >
          Sign Up
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
          Create your account
        </h1>
        <p className="text-sm text-white/60">
          Join HireLoop and find your next role — faster.
        </p>
      </div>

      {/* Social signup */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignUp}
        className="h-11 w-full rounded-lg border-white/15 bg-transparent text-[15px] font-medium text-white hover:bg-white/10 dark:bg-transparent dark:hover:bg-white/10"
      >
        <GoogleIcon className="mr-2" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/40">or continue with email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-white/70">
            Full name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            required
            value={formData.name}
            onChange={handleChange}
            className={FIELD_CLASSES}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white/70">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            required
            value={formData.email}
            onChange={handleChange}
            className={FIELD_CLASSES}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-white/70"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password (min. 8 characters)"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className={cn(FIELD_CLASSES, "pr-11")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-white/50 transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-white/70"
          >
            Confirm password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={cn(FIELD_CLASSES, "pr-11")}
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showConfirmPassword}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-white/50 transition-colors hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms agreement */}
        <div className="flex items-start gap-2">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            required
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1 size-4 rounded border-white/20 bg-[#101010] text-[#5c53fe] accent-[#5c53fe] focus:ring-[#5c53fe]/30"
          />
          <label
            htmlFor="agreeTerms"
            className="cursor-pointer select-none text-xs leading-relaxed text-white/70"
          >
            I agree to HireLoop&apos;s{" "}
            <Link href="/terms" className="text-[#5c53fe] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#5c53fe] hover:underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-[#5c53fe] text-[15px] font-medium text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] hover:bg-[#5c53fe]/90 transition-all cursor-pointer"
        >
          Create Account
        </Button>
      </form>

      {/* Switch to Sign In */}
      <p className="text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#5c53fe] transition-colors hover:text-[#7c74ff] hover:underline"
        >
          Sign in
        </Link>
      </p>

      {/* Terms disclaimer */}
      <p className="text-center text-xs leading-relaxed text-white/40">
        By continuing, you agree to HireLoop&apos;s Terms of Service and Privacy
        Policy.
      </p>
    </div>
  )
}
