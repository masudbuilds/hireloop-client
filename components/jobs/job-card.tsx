"use client"

import Link from "next/link"
import {
  Bookmark,
  Briefcase,
  Building2,
  DollarSign,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react"

import type { ManagedJobPost } from "@/types"
import { cn, formatSalary } from "@/lib/utils"

interface JobCardProps {
  job: ManagedJobPost
  onSave?: (jobId: string) => void
  className?: string
}

export function JobCard({ job, onSave, className }: JobCardProps) {
  const formattedSalary = formatSalary(job)

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#111114] hover:shadow-[0_0_30px_rgba(92,83,254,0.12)]",
        className
      )}
    >
      <div>
        {/* Top Header: Company Avatar & Title & Bookmark */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {/* Company Avatar / Logo */}
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-heading text-lg font-bold text-[#5c53fe] transition-colors group-hover:border-[#5c53fe]/40">
              {job.company ? job.company[0].toUpperCase() : <Building2 className="size-5" />}
            </div>

            <div>
              <Link href={`/jobs/${job._id}`}>
                <h3 className="font-heading text-lg font-semibold text-white transition-colors hover:text-[#5c53fe] sm:text-xl">
                  {job.title}
                </h3>
              </Link>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-white/60 sm:text-sm">
                <span className="font-medium text-white/80">{job.company}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  {job.isRemote ? (
                    <>
                      <Globe className="size-3 text-blue-400" />
                      <span>{job.location ? `${job.location} (Remote)` : "Remote"}</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="size-3 text-white/40" />
                      <span>{job.location || "Location not specified"}</span>
                    </>
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* Bookmark Button (empty handler ready for implementation) */}
          <button
            type="button"
            aria-label="Save job"
            onClick={() => onSave?.(job._id)}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <Bookmark className="size-4" />
          </button>
        </div>

        {/* Description Snippet */}
        {(job.responsibilities || job.requirements) && (
          <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-white/60 sm:text-sm">
            {job.responsibilities || job.requirements}
          </p>
        )}

        {/* Metadata Badges */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          {/* Compensation */}
          {formattedSalary !== "Negotiable" ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-medium text-white/80">
              <DollarSign className="size-3.5 text-[#5c53fe]" />
              <span>{formattedSalary}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white/60">
              Salary Negotiable
            </span>
          )}

          {/* Job Type */}
          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white/70">
            <Briefcase className="size-3 text-white/40" />
            <span>{job.type}</span>
          </span>

          {/* Category */}
          <span className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-white/50">
            {job.category}
          </span>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs">
        <span className="text-white/40">
          {job.postedAgo ? `Posted ${job.postedAgo}` : "Recently posted"}
        </span>

        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#5c53fe] px-4 py-2 font-medium text-white shadow-[0_0_15px_rgba(92,83,254,0.3)] transition-all hover:bg-[#5c53fe]/90 hover:shadow-[0_0_20px_rgba(92,83,254,0.5)]"
        >
          <Sparkles className="size-3.5" />
          <span>Easy Apply</span>
        </Link>
      </div>
    </article>
  )
}
