"use client"

import * as React from "react"
import { Filter, RotateCcw } from "lucide-react"

import { JOB_CATEGORIES, JOB_TYPES } from "@/types"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

export interface FilterOption {
  label: string
  value: string
  count?: string | number
}

interface JobFiltersSidebarProps {
  selectedType?: string
  selectedCategory?: string
  // Kept for backward compatibility
  selectedTypes?: string[]
  selectedCategories?: string[]
  selectedWorkplace?: string
  selectedSalary?: string
  onFilterChange?: (filterKey: string, value: string) => void
  onClearFilters?: () => void
  className?: string
}

const JOB_TYPE_OPTIONS: FilterOption[] = [
  { label: "All Types", value: "all" },
  ...JOB_TYPES.map((type) => ({
    label: type,
    value: type,
    count:
      type === "Full-time"
        ? "1.2k"
        : type === "Contract"
          ? "450"
          : type === "Part-time"
            ? "280"
            : "120",
  })),
]

const CATEGORY_OPTIONS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  ...JOB_CATEGORIES.slice(0, 6).map((cat) => ({
    label: cat,
    value: cat,
  })),
]

const WORKPLACE_OPTIONS: FilterOption[] = [
  { label: "All Workplaces", value: "all" },
  { label: "Remote Only", value: "isRemote", count: "850" },
  { label: "Hybrid", value: "hybrid", count: "320" },
  { label: "On-site", value: "onsite", count: "190" },
]

const SALARY_OPTIONS: FilterOption[] = [
  { label: "Any Salary", value: "any" },
  { label: "$50k+ / year", value: "50000-1000000", count: "980" },
  { label: "$100k+ / year", value: "100000-1000000", count: "640" },
  { label: "$150k+ / year", value: "150000-1000000", count: "310" },
  { label: "$200k+ / year", value: "200000-1000000", count: "120" },
]

export function JobFiltersSidebar({
  selectedType,
  selectedCategory,
  selectedTypes,
  selectedCategories,
  selectedWorkplace,
  selectedSalary,
  onFilterChange,
  onClearFilters,
  className,
}: JobFiltersSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Resolve current active selection from props or URL search params
  const currentType = selectedType ?? searchParams.get("type") ?? selectedTypes?.[0] ?? "all"
  const currentCategory = selectedCategory ?? searchParams.get("category") ?? selectedCategories?.[0] ?? "all"
  const currentWorkplace = selectedWorkplace ?? searchParams.get("workplace") ?? "all"
  const currentSalary = selectedSalary ?? searchParams.get("salary") ?? "any"

  const handleItemClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target

    const params = new URLSearchParams(searchParams.toString())

    if (value === "all" || value === "any") {
      params.delete(name)
    } else {
      params.set(name, value)
    }

    const queryString = params.toString()
    router.push(queryString ? `/jobs?${queryString}` : "/jobs")

    if (onFilterChange) {
      onFilterChange(name, value)
    }
  }

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("type")
    params.delete("category")
    params.delete("workplace")
    params.delete("salary")

    const queryString = params.toString()
    router.push(queryString ? `/jobs?${queryString}` : "/jobs")

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

      {/* Filter Group: Job Type (Single-select radio group) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-semibold tracking-wide text-white/90">
            Job Type
          </h3>
          <span className="text-[11px] text-white/40">Select one</span>
        </div>
        <div className="space-y-2">
          {JOB_TYPE_OPTIONS.map((option) => {
            const isSelected = currentType === option.value
            return (
              <label
                key={option.value}
                className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="type"
                    value={option.value}
                    checked={isSelected}
                    onChange={handleItemClick}
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

      {/* Filter Group: Category (Single-select radio group) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-semibold tracking-wide text-white/90">
            Category
          </h3>
          <span className="text-[11px] text-white/40">Select one</span>
        </div>
        <div className="space-y-2">
          {CATEGORY_OPTIONS.map((option) => {
            const isSelected = currentCategory === option.value
            return (
              <label
                key={option.value}
                className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={isSelected}
                    onChange={handleItemClick}
                    className="size-4 cursor-pointer border-white/20 bg-white/5 text-[#5c53fe] accent-[#5c53fe] focus:ring-[#5c53fe]"
                  />
                  <span className="truncate">{option.label}</span>
                </div>
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
            const isSelected = currentWorkplace === option.value
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
                    onChange={handleItemClick}
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

      {/* Filter Group: Salary Range */}
      <div className="space-y-3">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-white/90">
          Salary Range
        </h3>
        <div className="space-y-2">
          {SALARY_OPTIONS.map((option) => {
            const isSelected = currentSalary === option.value
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
                    onChange={handleItemClick}
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
