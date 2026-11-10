"use client"

import * as React from "react"
import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface JobSearchBarProps {
  defaultValue?: string
  defaultLocation?: string
  onSearch?: (query: string, location: string) => void
  className?: string
}

export function JobSearchBar({
  defaultValue = "",
  defaultLocation = "",
  onSearch,
  className,
}: JobSearchBarProps) {
  const [query, setQuery] = React.useState(defaultValue)
  const [location, setLocation] = React.useState(defaultLocation)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Empty handler as instructed; ready for user to implement
    if (onSearch) {
      onSearch(query, location)
    }
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-[#101012] p-2 sm:flex-row sm:items-center sm:gap-3 sm:py-2 sm:pl-5 sm:pr-2",
        className
      )}
    >
      {/* Title / Keywords Search Input */}
      <div className="flex flex-1 items-center gap-3">
        <Search
          aria-hidden="true"
          className="size-5 shrink-0 text-white/50"
        />
        <label className="sr-only" htmlFor="job-search-query">
          Job title, company, or keywords
        </label>
        <input
          id="job-search-query"
          name="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by job title, company, or keywords..."
          className="h-11 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/50 outline-none sm:text-base"
        />
      </div>

      {/* Divider */}
      <span
        aria-hidden="true"
        className="hidden h-7 w-px shrink-0 bg-white/10 sm:block"
      />

      {/* Location Search Input */}
      <div className="flex flex-1 items-center gap-3">
        <MapPin
          aria-hidden="true"
          className="size-5 shrink-0 text-white/50"
        />
        <label className="sr-only" htmlFor="job-search-location">
          Location or Remote
        </label>
        <input
          id="job-search-location"
          name="location"
          type="search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location or Remote"
          className="h-11 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/50 outline-none sm:text-base"
        />
      </div>

      {/* Submit Action Button */}
      <Button
        type="submit"
        className="h-11 shrink-0 rounded-xl bg-[#5c53fe] px-6 text-sm font-semibold text-white shadow-[0_0_20px_rgba(92,83,254,0.35)] transition-all hover:bg-[#5c53fe]/90 sm:h-12"
      >
        <Search className="size-4 sm:hidden" />
        <span>Search Jobs</span>
      </Button>
    </form>
  )
}
