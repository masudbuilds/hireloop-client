"use client"

import * as React from "react"
import { Filter, RotateCcw } from "lucide-react"

import { JOB_CATEGORIES, JOB_TYPES } from "@/types"
import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  value: string
  count?: string | number
}

interface JobFiltersSidebarProps {
  selectedTypes?: string[]
  selectedCategories?: string[]
  selectedWorkplace?: string
  selectedSalary?: string
  onFilterChange?: (filterKey: string, value: string) => void
  onClearFilters?: () => void
  className?: string
}

const WORKPLACE_OPTIONS: FilterOption[] = [
  { label: "All Workplaces", value: "all" },
  { label: "Remote Only", value: "remote", count: "850" },
  { label: "Hybrid", value: "hybrid", count: "320" },
  { label: "On-site", value: "onsite", count: "190" },
]

const SALARY_OPTIONS: FilterOption[] = [
  { label: "Any Salary", value: "any" },
  { label: "$50k+ / year", value: "50k", count: "980" },
  { label: "$100k+ / year", value: "100k", count: "640" },
  { label: "$150k+ / year", value: "150k", count: "310" },
  { label: "$200k+ / year", value: "200k", count: "120" },
]

export function JobFiltersSidebar({
  selectedTypes = [],
  selectedCategories = [],
  selectedWorkplace = "all",
  selectedSalary = "any",
  onFilterChange,
  onClearFilters,
  className,
}: JobFiltersSidebarProps) {
  // Empty click/change handler by default as instructed
  const handleItemClick = (filterKey: string, value: string) => {
    if (onFilterChange) {
      onFilterChange(filterKey, value)
    }
  }

  const handleReset = () => {
    if (onClearFilters) {
      onClearFilters()
    }
  }

  return (
    <aside
      aria-label="Job filters"
      className={cn(
        "flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 text-white",
        className
      )}
    >
      {/* Filters Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-[#5c53fe]" />
          <h2 className="font-heading text-lg font-semibold text-white">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white"
        >
          <RotateCcw className="size-3" />
          <span>Clear all</span>
        </button>
      </div>

      {/* Filter Group: Job Type */}
      <div className="space-y-3">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-white/90">
          Job Type
        </h3>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => {
            const isChecked = selectedTypes.includes(type)
            return (
              <label
                key={type}
                className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleItemClick("type", type)}
                    className="size-4 cursor-pointer rounded border-white/20 bg-white/5 text-[#5c53fe] accent-[#5c53fe] focus:ring-[#5c53fe]"
                  />
                  <span>{type}</span>
                </div>
                <span className="text-xs text-white/40 group-hover:text-white/60">
                  {type === "Full-time"
                    ? "1.2k"
                    : type === "Contract"
                      ? "450"
                      : type === "Part-time"
                        ? "280"
                        : "120"}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-white/10" />

      {/* Filter Group: Workplace Type */}
      <div className="space-y-3">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-white/90">
          Workplace Type
        </h3>
        <div className="space-y-2">
          {WORKPLACE_OPTIONS.map((option) => {
            const isSelected = selectedWorkplace === option.value
            return (
              <label
                key={option.value}
                className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="workplace"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleItemClick("workplace", option.value)}
                    className="size-4 cursor-pointer border-white/20 bg-white/5 text-[#5c53fe] accent-[#5c53fe] focus:ring-[#5c53fe]"
                  />
                  <span>{option.label}</span>
                </div>
                {option.count && (
                  <span className="text-xs text-white/40 group-hover:text-white/60">
                    {option.count}
                  </span>
                )}
              </label>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-white/10" />

      {/* Filter Group: Categories */}
      <div className="space-y-3">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-white/90">
          Category
        </h3>
        <div className="space-y-2">
          {JOB_CATEGORIES.slice(0, 6).map((category) => {
            const isChecked = selectedCategories.includes(category)
            return (
              <label
                key={category}
                className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleItemClick("category", category)}
                    className="size-4 cursor-pointer rounded border-white/20 bg-white/5 text-[#5c53fe] accent-[#5c53fe] focus:ring-[#5c53fe]"
                  />
                  <span className="truncate">{category}</span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-white/10" />

      {/* Filter Group: Salary Range */}
      <div className="space-y-3">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-white/90">
          Salary Range
        </h3>
        <div className="space-y-2">
          {SALARY_OPTIONS.map((option) => {
            const isSelected = selectedSalary === option.value
            return (
              <label
                key={option.value}
                className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="salary"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleItemClick("salary", option.value)}
                    className="size-4 cursor-pointer border-white/20 bg-white/5 text-[#5c53fe] accent-[#5c53fe] focus:ring-[#5c53fe]"
                  />
                  <span>{option.label}</span>
                </div>
                {option.count && (
                  <span className="text-xs text-white/40 group-hover:text-white/60">
                    {option.count}
                  </span>
                )}
              </label>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
