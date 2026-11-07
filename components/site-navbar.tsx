"use client"
import Link from "next/link"
import Image from "next/image"

import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

const signInClasses =
  "h-11 rounded-lg bg-white px-6 text-[15px] font-semibold text-[#5c53fe] shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] hover:bg-white/90"

const getStartedClasses =
  "h-11 rounded-lg bg-[#5c53fe] px-6 text-[15px] font-medium text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] hover:bg-[#5c53fe]/90"

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("shrink-0", className)}
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        className="h-11 w-auto"
        priority
      />
    </Link>
  )
}

function DesktopNav() {
  const { data: session } = useSession()
  return (
    <nav aria-label="Main" className="hidden items-center lg:flex">
      <ul className="flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-base text-white transition-colors hover:text-[#a8a8a8]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="mx-6 h-6 w-px bg-[#a8a8a8]/40" />
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-white">{`Welcome, ${session?.user.name}`}</span>
            <Button
              onClick={() => signOut()}
              className="h-11 rounded-lg bg-red-500 px-6 text-[15px] font-semibold text-[#fdf9f9] shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] hover:bg-red-500/90"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              nativeButton={false}
              render={<Link href="/sign-in" />}
              className={signInClasses}
            >
              Sign In
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/sign-up" />}
              className={getStartedClasses}
            >
              Get Started
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

function MobileNav() {
  const { data: session } = useSession()
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Open menu"
            className="text-white hover:bg-white/15 lg:hidden"
          />
        }
      >
        <MenuIcon />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-76 rounded-l-2xl border-l border-white/10 bg-[#222222] text-white"
      >
        <SheetHeader className="border-b border-white/10">
          <SheetTitle className="sr-only">HireLoop navigation</SheetTitle>
          <div className="flex items-center justify-between pr-10">
            <Logo />
          </div>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-1 flex-col px-4 py-2">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <SheetTrigger
                  nativeButton={false}
                  render={<Link href={link.href} className="block" />}
                >
                  <span className="block py-3 text-base text-white transition-colors hover:text-[#a8a8a8]">
                    {link.label}
                  </span>
                </SheetTrigger>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 px-4 pb-4">
          {session?.user ? (
            <>
              <span className="text-white">{`Welcome, ${session?.user.name}`}</span>
              <Button
                onClick={() => signOut()}
                className="h-11 rounded-lg bg-red-500 px-6 text-[15px] font-semibold text-[#fdf9f9] shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] hover:bg-red-500/90"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <SheetTrigger
                nativeButton={false}
                render={
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      className: cn(signInClasses, "w-full"),
                    })}
                  />
                }
              >
                Sign In
              </SheetTrigger>
              <SheetTrigger
                nativeButton={false}
                render={
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      className: cn(getStartedClasses, "w-full"),
                    })}
                  />
                }
              >
                Get Started
              </SheetTrigger>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <div className="mx-auto flex h-18 w-full max-w-330 items-center justify-between gap-4 rounded-2xl bg-[#222222]/90 py-2 pr-3 pl-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-md sm:pl-6 md:pr-4">
        <Logo />
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  )
}
