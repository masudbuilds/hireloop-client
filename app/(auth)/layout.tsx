import type { Metadata } from "next"
import type { ReactNode } from "react"

import { SiteNavbar } from "@/components/site-navbar"

export const metadata: Metadata = {
  title: "HireLoop",
  description: "Sign in or create an account on HireLoop to find your next role.",
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-x-clip bg-[#010103] text-white">
      <SiteNavbar />
      <main className="relative mx-auto flex w-full flex-1 items-center justify-center px-4 py-10">
        {/* Ambient glow behind the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(560px_320px_at_50%_18%,rgba(92,83,254,0.28),transparent_70%)]"
        />
        {children}
      </main>
    </div>
  )
}
