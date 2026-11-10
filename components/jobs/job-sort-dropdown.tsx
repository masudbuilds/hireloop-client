"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface JobSortDropdownProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const SORT_OPTIONS = [
  { label: "Most Recent", value: "recent" },
  { label: "Highest Salary", value: "salary-high" },
  { label: "Lowest Salary", value: "salary-low" },
  { label: "Most Popular", value: "popular" },
]

export function JobSortDropdown({
  value = "recent",
  onChange,
  className,
}: JobSortDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Empty default handler as instructed
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex items-center gap-1.5 text-xs font-medium text-white/60">
        <ArrowUpDown className="size-3.5 text-[#5c53fe]" />
        <span>Sort by:</span>
      </span>
      <select
        value={value}
        onChange={handleChange}
        className="h-9 cursor-pointer rounded-xl border border-white/10 bg-[#0c0c0e] px-3 py-1 text-xs font-medium text-white outline-none transition-colors hover:border-white/20 focus:border-[#5c53fe]"
      >
        {SORT_OPTIONS.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#0c0c0e] text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
