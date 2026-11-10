import React from "react"
import { Briefcase } from "lucide-react"

import { getJobs } from "@/lib/api/jobs"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/home/site-footer"
import { JobSearchBar } from "@/components/jobs/job-search-bar"
import { JobFiltersSidebar } from "@/components/jobs/job-filters-sidebar"
import { JobCard } from "@/components/jobs/job-card"
import { JobSortDropdown } from "@/components/jobs/job-sort-dropdown"
import { MobileFiltersDrawer } from "@/components/jobs/mobile-filters-drawer"

interface JobsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const search = await searchParams
  const urlSearch = new URLSearchParams()

  if (search) {
    Object.entries(search).forEach(([key, val]) => {
      if (typeof val === "string" && val.trim()) {
        urlSearch.set(key, val.trim())
      } else if (Array.isArray(val)) {
        val.forEach((v) => {
          if (typeof v === "string" && v.trim()) {
            urlSearch.append(key, v.trim())
          }
        })
      }
    })
  }

  const query = urlSearch.toString()
  const jobs = await getJobs(query)

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#010103] text-white">
      {/* Site Navbar */}
      <SiteNavbar />

      <main className="relative pb-24">
        {/* Header Section: Search & Quick Filters */}
        <section className="relative border-b border-white/10 bg-linear-to-b from-[#09090d] to-[#010103] pt-32 pb-12 sm:pt-36 sm:pb-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <span className="size-1.5 rounded-full bg-[#5c53fe]" />
                <span className="font-badge text-xs uppercase tracking-wider text-white/80">
                  Explore Opportunities
                </span>
              </div>

              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Browse Professional Jobs
              </h1>
              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Discover your next career leap among thousands of verified listings at top tech companies.
              </p>

              {/* Search Bar */}
              <div className="mt-8 w-full">
                <JobSearchBar
                  defaultValue={typeof search?.search === "string" ? search.search : ""}
                  defaultLocation={typeof search?.location === "string" ? search.location : ""}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area: Sidebar Filters + Jobs Grid */}
        <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Desktop Sidebar Filters */}
            <div className="hidden w-72 shrink-0 lg:block xl:w-80">
              <JobFiltersSidebar className="sticky top-24" />
            </div>

            {/* Right Side: Results Header & Job Grid */}
            <div className="flex-1">
              {/* Results Top Bar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-heading text-xl font-semibold text-white">
                    Found {jobs.length} {jobs.length === 1 ? "Job" : "Professional Jobs"}
                  </h2>
                  <p className="mt-0.5 text-xs text-white/50">
                    Live postings matching current marketplace listings
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filters Drawer */}
                  <MobileFiltersDrawer />

                  {/* Sort Dropdown */}
                  <JobSortDropdown />
                </div>
              </div>

              {/* Job Listings Cards */}
              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-5">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0c0c0e]/50 p-12 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40">
                    <Briefcase className="size-6 text-[#5c53fe]" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                    No jobs found
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm text-white/50">
                    We couldn&apos;t find any active listings matching your current search criteria. Try modifying your filters or search keywords.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}
