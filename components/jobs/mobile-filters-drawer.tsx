"use client"

import * as React from "react"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { JobFiltersSidebar } from "@/components/jobs/job-filters-sidebar"

interface MobileFiltersDrawerProps {
  selectedType?: string
  selectedCategory?: string
  selectedTypes?: string[]
  selectedCategories?: string[]
  selectedWorkplace?: string
  selectedSalary?: string
  onFilterChange?: (filterKey: string, value: string) => void
  onClearFilters?: () => void
}

export function MobileFiltersDrawer(props: MobileFiltersDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 rounded-xl border-white/10 bg-[#0c0c0e] text-xs font-medium text-white hover:border-white/20 hover:bg-white/5 lg:hidden"
          >
            <Filter className="size-3.5 text-[#5c53fe]" />
            <span>Filters</span>
          </Button>
        }
      />
      <SheetContent
        side="left"
        className="w-full max-w-xs overflow-y-auto border-r border-white/10 bg-[#010103] p-4 text-white sm:max-w-sm"
      >
        <SheetHeader className="pb-2">
          <SheetTitle className="font-heading text-lg font-semibold text-white">
            Filter Jobs
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <JobFiltersSidebar
            {...props}
            className="border-none bg-transparent p-0"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
