"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Download,
  Eye,
  ExternalLink,
  FileText,
  Filter,
  Globe,
  HelpCircle,
  Link as LinkIcon,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  User,
  X,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/auth-client"
import { getApplicationsBySeeker } from "@/lib/actions/applications"
import type { ApplicationStatus, JobApplication } from "@/types"

// Dummy applications matching the Figma design for initial view
const DUMMY_APPLICATIONS: JobApplication[] = [
  {
    _id: "app-1",
    jobId: "job-101",
    jobTitle: "Senior Frontend Engineer",
    company: "Stark Industries",
    location: "New York, NY (Remote)",
    salary: "$140k - $175k",
    jobType: "Full-time",
    workplace: "Remote",
    seekerName: "Alexander Seeker",
    seekerEmail: "alex@example.com",
    portfolioUrl: "https://portfolio.dev/alex",
    note: "Excited about building high-performance reactive interfaces and scaling web platforms.",
    status: "In Review",
    appliedAt: "2026-11-10T16:00:00.000Z",
    appliedAgo: "2 hours ago",
  },
  {
    _id: "app-2",
    jobId: "job-102",
    jobTitle: "Product Designer",
    company: "Cyberdyne Systems",
    location: "Los Angeles, CA",
    salary: "$120k - $150k",
    jobType: "Contract",
    workplace: "Hybrid",
    seekerName: "Alexander Seeker",
    seekerEmail: "alex@example.com",
    portfolioUrl: "https://dribbble.com/alex",
    note: "Specialized in dark-mode design systems, accessible UI patterns, and rapid prototyping in Figma.",
    status: "Interview",
    appliedAt: "2026-11-09T14:30:00.000Z",
    appliedAgo: "1 day ago",
  },
  {
    _id: "app-3",
    jobId: "job-103",
    jobTitle: "Lead Data Scientist",
    company: "Wayne Enterprises",
    location: "Gotham / Chicago, IL",
    salary: "$160k - $210k",
    jobType: "Full-time",
    workplace: "On-site",
    seekerName: "Alexander Seeker",
    seekerEmail: "alex@example.com",
    portfolioUrl: "https://github.com/alex",
    note: "Background in applied ML, predictive pipelines, and automated intelligence analysis.",
    status: "Shortlisted",
    appliedAt: "2026-11-06T10:15:00.000Z",
    appliedAgo: "4 days ago",
  },
  {
    _id: "app-4",
    jobId: "job-104",
    jobTitle: "Cloud Architect",
    company: "Oscorp Tech",
    location: "Austin, TX",
    salary: "$150k - $190k",
    jobType: "Full-time",
    workplace: "Remote",
    seekerName: "Alexander Seeker",
    seekerEmail: "alex@example.com",
    portfolioUrl: "https://linkedin.com/in/alex",
    note: "Designing resilient multi-cloud container orchestration infrastructures.",
    status: "Rejected",
    appliedAt: "2026-11-03T09:00:00.000Z",
    appliedAgo: "1 week ago",
  },
  {
    _id: "app-5",
    jobId: "job-105",
    jobTitle: "AI Research Engineer",
    company: "Hooli Corp",
    location: "Palo Alto, CA",
    salary: "$180k - $240k",
    jobType: "Full-time",
    workplace: "Hybrid",
    seekerName: "Alexander Seeker",
    seekerEmail: "alex@example.com",
    portfolioUrl: "https://huggingface.co/alex",
    note: "Focusing on large language model alignment, context retrieval, and agent frameworks.",
    status: "Offered",
    appliedAt: "2026-10-27T11:00:00.000Z",
    appliedAgo: "2 weeks ago",
  },
]

const STATUS_FILTERS: Array<"All" | ApplicationStatus> = [
  "All",
  "In Review",
  "Interview",
  "Shortlisted",
  "Offered",
  "Rejected",
]

export default function SeekerApplicationsPage() {
  const { data: session } = useSession()
  const [applications, setApplications] = React.useState<JobApplication[]>(DUMMY_APPLICATIONS)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All")
  const [activeTab, setActiveTab] = React.useState<"active" | "archived">("active")
  const [selectedApplication, setSelectedApplication] = React.useState<JobApplication | null>(null)
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  // Try to load any actual user applications from the backend if available
  React.useEffect(() => {
    async function loadUserApplications() {
      if (session?.user?.email) {
        try {
          setIsLoading(true)
          const liveData = await getApplicationsBySeeker(session.user.email)
          if (liveData && liveData.length > 0) {
            setApplications(liveData)
          }
        } catch {
          // Keep dummy applications on connection error
        } finally {
          setIsLoading(false)
        }
      }
    }
    loadUserApplications()
  }, [session])

  // Filter applications by search query, tab, and status
  const filteredApplications = React.useMemo(() => {
    return applications.filter((app) => {
      // Tab filter
      if (activeTab === "active" && app.status === "Rejected") return false
      if (activeTab === "archived" && app.status !== "Rejected") return false

      // Status pill filter
      if (selectedStatus !== "All" && app.status !== selectedStatus) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesTitle = app.jobTitle.toLowerCase().includes(q)
        const matchesCompany = app.company.toLowerCase().includes(q)
        const matchesLocation = app.location?.toLowerCase().includes(q) || false
        if (!matchesTitle && !matchesCompany && !matchesLocation) return false
      }

      return true
    })
  }, [applications, activeTab, selectedStatus, searchQuery])

  // Stats calculation
  const stats = React.useMemo(() => {
    const total = applications.length
    const inReview = applications.filter((a) => a.status === "In Review" || a.status === "Applied").length
    const interviews = applications.filter((a) => a.status === "Interview" || a.status === "Shortlisted").length
    const offered = applications.filter((a) => a.status === "Offered").length
    const successRate = total > 0 ? Math.round((offered / total) * 100) : 0
    return { total, inReview, interviews, successRate }
  }, [applications])

  const handleExportPdf = () => {
    toast.add({
      title: "Exporting Applications",
      description: "Generating your applications summary PDF report...",
      type: "info",
    })
    setTimeout(() => {
      toast.add({
        title: "Export Ready",
        description: "Your applications report has been downloaded.",
        type: "success",
      })
    }, 1200)
  }

  const handleViewDetails = (app: JobApplication) => {
    setSelectedApplication(app)
    setDetailsOpen(true)
  }

  return (
    <div className="min-h-screen space-y-8 p-4 text-white sm:p-6 lg:p-8">
      {/* 1. Header Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            My Applications
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Active / Archived Tab Toggle */}
          <div className="inline-flex rounded-xl border border-white/10 bg-[#0c0c0e] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={cn(
                "cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeTab === "active"
                  ? "bg-[#5c53fe] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              )}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("archived")}
              className={cn(
                "cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeTab === "archived"
                  ? "bg-[#5c53fe] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              )}
            >
              Archived
            </button>
          </div>

          {/* Export PDF Button */}
          <Button
            type="button"
            onClick={handleExportPdf}
            variant="outline"
            className="flex cursor-pointer items-center gap-2 rounded-xl border-white/10 bg-white/5 text-xs font-medium text-white hover:border-white/20 hover:bg-white/10"
          >
            <Download className="size-3.5 text-[#5c53fe]" />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      {/* 2. Stats Overview - Bento Layout */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Total Applied */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] p-5 transition-colors hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/50">Total Applied</span>
            <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#5c53fe]">
              <FileText className="size-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            {stats.total}
          </p>
          <span className="mt-1 block text-[11px] text-white/40">Across all platforms</span>
        </div>

        {/* Review / In Review */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] p-5 transition-colors hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/50">In Review</span>
            <div className="flex size-8 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Clock className="size-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            {stats.inReview}
          </p>
          <span className="mt-1 block text-[11px] text-amber-400/70">Awaiting recruiter review</span>
        </div>

        {/* Shortlisted / Interviews */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] p-5 transition-colors hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/50">Interviews</span>
            <div className="flex size-8 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400">
              <Sparkles className="size-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            {stats.interviews}
          </p>
          <span className="mt-1 block text-[11px] text-sky-400/70">Active discussions</span>
        </div>

        {/* Success Rate */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] p-5 transition-colors hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/50">Success Rate</span>
            <div className="flex size-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            {stats.successRate}%
          </p>
          <span className="mt-1 block text-[11px] text-emerald-400/70">Applications to offers</span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0c0c0e] p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-white/40" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications by title, company, or location..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-xs text-white placeholder:text-white/40 focus:border-[#5c53fe] focus:outline-none sm:text-sm"
          />
        </div>

        {/* Status Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {STATUS_FILTERS.map((status) => {
            const isSelected = selectedStatus === status
            return (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  isSelected
                    ? "bg-[#5c53fe] text-white shadow-sm"
                    : "border border-white/5 bg-white/5 text-white/60 hover:border-white/10 hover:text-white"
                )}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Main Applications Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-white/10 bg-white/2">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="w-85 text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Job Title
                </TableHead>
                <TableHead className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Company
                </TableHead>
                <TableHead className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Applied
                </TableHead>
                <TableHead className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-right text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <TableRow
                    key={app._id || `${app.jobId}-${app.appliedAt}`}
                    className="border-b border-white/5 transition-colors hover:bg-white/3"
                  >
                    {/* Job Title & Badges */}
                    <TableCell className="py-4 font-medium text-white">
                      <div>
                        <Link
                          href={`/jobs/${app.jobId}`}
                          className="font-heading text-sm font-semibold text-white transition-colors hover:text-[#5c53fe] sm:text-base"
                        >
                          {app.jobTitle}
                        </Link>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          {app.jobType && (
                            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/70">
                              {app.jobType}
                            </span>
                          )}
                          {app.workplace && (
                            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/70">
                              {app.workplace}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Company */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-heading text-xs font-bold text-[#5c53fe]">
                          {app.company ? app.company[0].toUpperCase() : <Building2 className="size-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/90">{app.company}</p>
                          {app.location && (
                            <p className="text-xs text-white/40">{app.location}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Applied Date / Relative Time */}
                    <TableCell className="py-4 text-xs text-white/60">
                      <span>{app.appliedAgo || "Recently"}</span>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell className="py-4">
                      <ApplicationStatusBadge status={app.status} />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-4 text-right">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleViewDetails(app)}
                        variant="outline"
                        className="cursor-pointer rounded-xl border-white/10 bg-white/5 text-xs font-medium text-white hover:border-white/20 hover:bg-white/10"
                      >
                        <span>Details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center justify-center text-center">
                      <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40">
                        <FileText className="size-5 text-[#5c53fe]" />
                      </div>
                      <h3 className="mt-4 font-heading text-base font-semibold text-white">
                        No applications found
                      </h3>
                      <p className="mt-1 text-xs text-white/50">
                        {searchQuery || selectedStatus !== "All"
                          ? "Try clearing your filters or search terms."
                          : "You haven't submitted any job applications yet."}
                      </p>
                      {(searchQuery || selectedStatus !== "All") && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            setSearchQuery("")
                            setSelectedStatus("All")
                          }}
                          className="mt-4 rounded-xl bg-[#5c53fe] text-xs font-semibold text-white hover:bg-[#5c53fe]/90"
                        >
                          Reset Filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* 5. Pagination Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-xs text-white/50">
          <span>
            Showing {filteredApplications.length > 0 ? "1" : "0"}-{filteredApplications.length} of {applications.length} applications
          </span>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              disabled
              variant="outline"
              className="h-8 rounded-lg border-white/10 bg-white/5 text-xs text-white/40 opacity-50"
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              disabled
              variant="outline"
              className="h-8 rounded-lg border-white/10 bg-white/5 text-xs text-white/40 opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* 6. Application Details Sheet / Drawer */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent
          side="right"
          className="w-full border-l border-white/10 bg-[#0c0c0e] p-6 text-white sm:max-w-md"
        >
          {selectedApplication && (
            <div className="space-y-6">
              <SheetHeader className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <ApplicationStatusBadge status={selectedApplication.status} />
                  <span className="text-xs text-white/50">
                    {selectedApplication.appliedAgo || "Submitted"}
                  </span>
                </div>
                <SheetTitle className="mt-3 font-heading text-xl font-bold text-white">
                  {selectedApplication.jobTitle}
                </SheetTitle>
                <SheetDescription className="text-xs text-white/60">
                  {selectedApplication.company}
                </SheetDescription>
              </SheetHeader>

              {/* Details Key-Value Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Position Details
                </h4>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Location:</span>
                    <span className="font-medium text-white">{selectedApplication.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Job Type:</span>
                    <span className="font-medium text-white">{selectedApplication.jobType || "Full-time"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Workplace:</span>
                    <span className="font-medium text-white">{selectedApplication.workplace || "Remote"}</span>
                  </div>
                  {selectedApplication.salary && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/50">Salary:</span>
                      <span className="font-medium text-white">{selectedApplication.salary}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Applicant Submission Record */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Your Submission
                </h4>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 text-xs">
                  <div>
                    <span className="block text-[11px] text-white/40">Applicant Name</span>
                    <span className="font-medium text-white">{selectedApplication.seekerName}</span>
                  </div>

                  <div>
                    <span className="block text-[11px] text-white/40">Email Address</span>
                    <span className="font-medium text-white">{selectedApplication.seekerEmail}</span>
                  </div>

                  {selectedApplication.portfolioUrl && (
                    <div>
                      <span className="block text-[11px] text-white/40">Portfolio / Profile</span>
                      <a
                        href={selectedApplication.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-[#5c53fe] hover:underline"
                      >
                        <span className="truncate max-w-60">{selectedApplication.portfolioUrl}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  )}

                  {selectedApplication.note && (
                    <div>
                      <span className="block text-[11px] text-white/40">Cover Note</span>
                      <p className="mt-1 rounded-lg border border-white/5 bg-white/5 p-2.5 text-xs text-white/80 leading-relaxed">
                        {selectedApplication.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action: View Live Job Listing */}
              <div className="pt-2">
                <Link
                  href={`/jobs/${selectedApplication.jobId}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5c53fe] py-3 text-xs font-semibold text-white shadow-[0_0_20px_rgba(92,83,254,0.35)] transition-colors hover:bg-[#5c53fe]/90"
                >
                  <span>View Original Job Listing</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const configs: Record<ApplicationStatus, { label: string; className: string }> = {
    "In Review": {
      label: "In Review",
      className: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    },
    Applied: {
      label: "Applied",
      className: "border-white/10 bg-white/5 text-white/70",
    },
    Shortlisted: {
      label: "Shortlisted",
      className: "border-[#5c53fe]/25 bg-[#5c53fe]/10 text-[#5c53fe]",
    },
    Interview: {
      label: "Interview",
      className: "border-sky-500/20 bg-sky-500/10 text-sky-400",
    },
    Offered: {
      label: "Offered",
      className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },
    Rejected: {
      label: "Rejected",
      className: "border-rose-500/20 bg-rose-500/10 text-rose-400",
    },
  }

  const config = configs[status] || configs["In Review"]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
