"use client"

import * as React from "react"
import Link from "next/link"

import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type AuthMode = "sign-in" | "sign-up"

/** Data collected by the forms — shaped for better-auth's email flows. */
type AuthSubmitData = {
  name: string
  email: string
  password: string
}

/**
 * Public submit handler so real auth (e.g. authClient.signIn.email /
 * authClient.signUp.email) can be wired in later without touching the forms.
 */
export type AuthSubmitHandler = (data: AuthSubmitData) => void | Promise<void>

const MODES: Array<{ id: AuthMode; label: string }> = [
  { id: "sign-in", label: "Sign In" },
  { id: "sign-up", label: "Sign Up" },
]

const AUTH_FIELD_CLASSES =
  "h-11 rounded-lg border-white/15 bg-[#101010] px-3.5 text-[15px] text-white placeholder:text-white/50 hover:border-white/25 focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/30"

function AuthField({
  label,
  htmlFor,
  trailing,
  children,
}: {
  label: string
  htmlFor: string
  trailing?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium text-white/70">
          {label}
        </label>
        {trailing}
      </div>
      {children}
    </div>
  )
}

function PasswordField({
  label,
  htmlFor,
  autoComplete,
  placeholder,
  trailing,
}: {
  label: string
  htmlFor: string
  autoComplete: string
  placeholder: string
  trailing?: React.ReactNode
}) {
  const [show, setShow] = React.useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium text-white/70">
          {label}
        </label>
        {trailing}
      </div>
      <div className="relative">
        <Input
          id={htmlFor}
          name={htmlFor}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required
          minLength={8}
          className={cn(AUTH_FIELD_CLASSES, "pr-11")}
        />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          onClick={() => setShow((value) => !value)}
          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-white/50 transition-colors hover:text-white"
        >
          {show ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </button>
      </div>
    </div>
  )
}

function defaultSubmitHandler(data: AuthSubmitData) {
  // Placeholder until the real auth client is wired up.
  console.log("Auth form submitted", data)
}

function SignInForm({ onSubmit }: { onSubmit: AuthSubmitHandler }) {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        const raw = new FormData(event.currentTarget)
        onSubmit({
          name: "",
          email: String(raw.get("email") ?? ""),
          password: String(raw.get("password") ?? ""),
        })
      }}
    >
      <AuthField label="Email" htmlFor="sign-in-email">
        <Input
          id="sign-in-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          required
          className={AUTH_FIELD_CLASSES}
        />
      </AuthField>
      <PasswordField
        label="Password"
        htmlFor="sign-in-password"
        autoComplete="current-password"
        placeholder="Enter your password"
        trailing={
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#5c53fe] transition-colors hover:text-[#7c74ff]"
          >
            Forgot password?
          </Link>
        }
      />
      <Button
        type="submit"
        className="h-11 w-full rounded-lg bg-[#5c53fe] text-[15px] font-medium text-white hover:bg-[#5c53fe]/90"
      >
        Sign In
      </Button>
    </form>
  )
}

function SignUpForm({ onSubmit }: { onSubmit: AuthSubmitHandler }) {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        const raw = new FormData(event.currentTarget)
        onSubmit({
          name: String(raw.get("name") ?? ""),
          email: String(raw.get("email") ?? ""),
          password: String(raw.get("password") ?? ""),
        })
      }}
    >
      <AuthField label="Full name" htmlFor="sign-up-name">
        <Input
          id="sign-up-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          required
          className={AUTH_FIELD_CLASSES}
        />
      </AuthField>
      <AuthField label="Email" htmlFor="sign-up-email">
        <Input
          id="sign-up-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          required
          className={AUTH_FIELD_CLASSES}
        />
      </AuthField>
      <PasswordField
        label="Password"
        htmlFor="sign-up-password"
        autoComplete="new-password"
        placeholder="Create a password (8+ characters)"
      />
      <Button
        type="submit"
        className="h-11 w-full rounded-lg bg-[#5c53fe] text-[15px] font-medium text-white hover:bg-[#5c53fe]/90"
      >
        Create Account
      </Button>
    </form>
  )
}

export interface AuthCardProps {
  initialMode: AuthMode
  className?: string
  /** Fired when the segmented toggle switches the active mode. */
  onModeChange?: (mode: AuthMode) => void
  /** Fired on valid form submission with the collected form data. */
  onSubmit?: AuthSubmitHandler
  /** Placeholder hook for social providers (e.g. Google via better-auth). */
  onSocialLogin?: (provider: "google") => void
}

export function AuthCard({
  initialMode,
  className,
  onModeChange,
  onSubmit = defaultSubmitHandler,
  onSocialLogin,
}: AuthCardProps) {
  const [mode, setMode] = React.useState<AuthMode>(initialMode)

  const switchMode = (next: AuthMode) => {
    setMode(next)
    onModeChange?.(next)
  }

  return (
    <div
      data-mode={mode}
      className={cn(
        "flex w-full flex-col gap-6 rounded-2xl border border-white/10 bg-[#151516] p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:p-8",
        className
      )}
    >
      {/* Mode toggle */}
      <div
        role="tablist"
        aria-label="Authentication mode"
        className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl bg-[#101010] p-1"
      >
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={mode === item.id}
            onClick={() => switchMode(item.id)}
            className={cn(
              "rounded-lg py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5c53fe]/60",
              mode === item.id
                ? "bg-[#5c53fe] text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
          {mode === "sign-in" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-white/60">
          {mode === "sign-in"
            ? "Sign in to continue your job hunt."
            : "Join HireLoop and find your next role — faster."}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => onSocialLogin?.("google")}
        className="h-11 w-full rounded-lg border-white/15 bg-transparent text-[15px] font-medium text-white hover:bg-white/10 dark:bg-transparent dark:hover:bg-white/10"
      >
        Continue with Google
      </Button>

      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/40">or continue with email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {mode === "sign-in" ? (
        <SignInForm key="sign-in" onSubmit={onSubmit} />
      ) : (
        <SignUpForm key="sign-up" onSubmit={onSubmit} />
      )}

      <p className="text-center text-xs leading-relaxed text-white/40">
        By continuing, you agree to HireLoop&apos;s Terms of Service and Privacy
        Policy.
      </p>
    </div>
  )
}
