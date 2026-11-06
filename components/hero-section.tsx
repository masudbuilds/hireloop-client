import Image from "next/image"
import Link from "next/link"

import {
  BriefcaseBusinessIcon,
  MapPinIcon,
  SearchIcon,
} from "lucide-react"

const TRENDING_POSITIONS = [
  { label: "Product Designer", href: "/jobs?q=Product%20Designer" },
  { label: "AI Engineering", href: "/jobs?q=AI%20Engineering" },
  { label: "Dev-ops Engineer", href: "/jobs?q=Dev-ops%20Engineer" },
] as const

function HeroBadge() {
  return (
    <div className="flex items-center">
      {/* Fading accent line */}
      <span
        aria-hidden="true"
        className="h-px w-8 shrink-0 bg-linear-to-r from-[#010103] via-[#a8a8a8]/80 to-[#a8a8a8]/80 sm:w-16"
      />
      {/* Gradient-ringed pill */}
      <div className="rounded-full bg-[conic-gradient(from_140deg_at_50%_50%,#ff00ff_14%,#0000ff_28%,#00ffff_42%,#00ff00_56%,#ffff00_70%,#ffbf00_84%,#ff0000_100%)] p-px">
        <div className="flex h-11 items-center gap-4 rounded-full bg-linear-to-b from-[#474747] to-[#010102] px-6">
          <BriefcaseBusinessIcon
            aria-hidden="true"
            className="size-6 shrink-0 text-white"
          />
          <span className="font-badge text-base leading-[1.2] text-white sm:text-xl">
            50,000+ new jobs this month
          </span>
        </div>
      </div>
      {/* Fading accent line */}
      <span
        aria-hidden="true"
        className="h-px w-8 shrink-0 bg-linear-to-r from-[#a8a8a8]/80 via-[#a8a8a8]/80 to-[#010103] sm:w-16"
      />
    </div>
  )
}

function HeroSearch() {
  return (
    <form
      role="search"
      action="/jobs"
      method="get"
      className="flex w-full flex-col gap-2 rounded-2xl border border-white bg-[#101010] p-2 sm:flex-row sm:items-center sm:gap-6 sm:py-2 sm:pl-6 sm:pr-2"
    >
      <label className="flex flex-1 items-center gap-2">
        <SearchIcon
          aria-hidden="true"
          className="size-5 shrink-0 text-white"
        />
        <span className="sr-only">Job title, skill or company</span>
        <input
          name="q"
          type="search"
          placeholder="Job title, skill or company"
          className="h-12 w-full min-w-0 bg-transparent text-base text-white placeholder:text-white/80 outline-none"
        />
      </label>
      <span aria-hidden="true" className="hidden h-6 w-px shrink-0 bg-white/20 sm:block" />
      <label className="flex flex-1 items-center gap-2">
        <MapPinIcon
          aria-hidden="true"
          className="size-5 shrink-0 text-white"
        />
        <span className="sr-only">Location or Remote</span>
        <input
          name="location"
          type="search"
          placeholder="Location or Remote"
          className="h-12 w-full min-w-0 bg-transparent text-base text-white placeholder:text-white/80 outline-none"
        />
      </label>
      <button
        type="submit"
        aria-label="Search"
        className="flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-[#5c53fe] transition-colors hover:bg-[#5c53fe]/90 sm:aspect-square sm:size-12 sm:w-auto"
      >
        <SearchIcon aria-hidden="true" className="size-6 text-white" />
      </button>
    </form>
  )
}

function HeroTrending() {
  return (
    <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
      <span className="text-base leading-[1.3] text-white/70">
        Trending Position
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {TRENDING_POSITIONS.map((position) => (
          <Link
            key={position.label}
            href={position.href}
            className="rounded-full border border-white bg-[#1a1a1b] px-3 py-1.5 text-sm leading-normal text-white transition-colors hover:bg-[#2a2a2c]"
          >
            {position.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative pb-40 sm:pb-56 lg:pb-89">
      {/* Hero background: star field, magenta haze and violet globe composite */}
      <Image
        src="/images/globe.png"
        alt=""
        aria-hidden="true"
        width={1440}
        height={1882}
        priority
        sizes="100vw"
        // The composite starts 70px above the page top (154px above the
        // section, which sits below the 84px navbar). Edges are masked so the
        // glow blends into the page on viewports wider than the 1440px source.
        style={{
          top: "-154px",
          maskImage:
            "linear-gradient(to right, transparent, black 9%, black 91%, transparent), linear-gradient(to bottom, transparent, black 120px)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 9%, black 91%, transparent), linear-gradient(to bottom, transparent, black 120px)",
          WebkitMaskComposite: "source-in",
        }}
        className="pointer-events-none absolute left-1/2 w-full max-w-360 -translate-x-1/2 select-none"
      />

      <div className="relative mx-auto flex w-full max-w-196 flex-col items-center gap-12 px-4 pt-40 text-center sm:px-6 lg:pt-48">
        <HeroBadge />

        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg leading-[1.6] text-white/70 sm:text-xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role —
            faster.
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <HeroSearch />
          <HeroTrending />
        </div>
      </div>
    </section>
  )
}
