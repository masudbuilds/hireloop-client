"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit3,
  ExternalLink,
  Filter,
  Globe,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { JobFormData } from "./new/page"
import { cn } from "@/lib/utils"
import { getJobs } from "@/lib/api/jobs"

export interface ManagedJobPost extends JobFormData {
  id: string
  status: "Active" | "Closed" | "Draft"
  applicantsCount: number
  viewsCount: number
  postedAt: string
  postedAgo: string
}

const PLAN_LIMIT = 10

export default function ManageJobsPage() {
  const [jobs, setJobs] = React.useState<ManagedJobPost[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("All")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("All")

  React.useEffect(() => {
    let isMounted = true

    async function loadJobs() {
      try {
        setIsLoading(true)
        const fetchedJobs = await getJobs()
        if (isMounted && Array.isArray(fetchedJobs)) {
          setJobs(fetchedJobs)
        }
      } catch (err) {
        console.error("Failed to load jobs from API:", err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadJobs()

    return () => {
      isMounted = false
    }
  }, [])

  // Toggle active/closed status
  const handleToggleStatus = (jobId: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          const nextStatus = job.status === "Active" ? "Closed" : "Active"
          return { ...job, status: nextStatus }
        }
        return job
      })
    )
  }

  // Delete job listing
  const handleDeleteJob = (jobId: string) => {
    if (confirm("Are you sure you want to remove this job posting?")) {
      setJobs((prev) => prev.filter((job) => job.id !== jobId))
    }
  }

  // Filter calculations
  const activeJobsCount = jobs.filter((j) => j.status === "Active").length
  const totalApplicantsCount = jobs.reduce(
    (sum, j) => sum + j.applicantsCount,
    0
  )
  const totalViewsCount = jobs.reduce((sum, j) => sum + j.viewsCount, 0)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "All" ? true : job.status === statusFilter

    const matchesCategory =
      categoryFilter === "All" ? true : job.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Format compensation helper
  const formatSalary = (job: ManagedJobPost) => {
    if (!job.minSalary && !job.maxSalary) return "Negotiable"
    const min = job.minSalary
      ? `$${Number(job.minSalary).toLocaleString()}`
      : ""
    const max = job.maxSalary
      ? `$${Number(job.maxSalary).toLocaleString()}`
      : ""

    let text = ""
    if (min && max) {
      text = `${min} - ${max}`
    } else if (min) {
      text = `${min}+`
    } else {
      text = `Up to ${max}`
    }

    const freqShort =
      job.salaryFrequency === "per hour"
        ? "/hr"
        : job.salaryFrequency === "per month"
          ? "/mo"
          : "/yr"

    return `${text} ${freqShort}`
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Manage Jobs</span>
          <span>/</span>
          <span>Job Listings & Postings</span>
        </div>

        {/* Post New Job Action Button */}
        <Button
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          className="gap-2"
        >
          <Plus className="size-4" />
          <span>Post New Job</span>
        </Button>
      </div>

      {/* Page Heading & Plan Usage Metric */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        {/* Active plan usage indicator */}
        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-xs">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Briefcase className="size-5" />
          </div>
          <div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-medium text-muted-foreground">
                Active Plan Usage
              </span>
              <span className="font-semibold text-foreground">
                {activeJobsCount} / {PLAN_LIMIT} Slots
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-36 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${Math.min(100, (activeJobsCount / PLAN_LIMIT) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Jobs</p>
              <h3 className="text-lg font-bold text-foreground">
                {activeJobsCount}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Users className="size-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Applicants</p>
              <h3 className="text-lg font-bold text-foreground">
                {totalApplicantsCount}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Building2 className="size-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Views</p>
              <h3 className="text-lg font-bold text-foreground">
                {totalViewsCount}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="size-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Posts</p>
              <h3 className="text-lg font-bold text-foreground">
                {jobs.length}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by job title, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status Tabs */}
              <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1 text-xs">
                {["All", "Active", "Closed"].map((tab) => {
                  const isSelected = statusFilter === tab
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setStatusFilter(tab)}
                      className={cn(
                        "rounded-md px-3 py-1 font-medium transition-colors",
                        isSelected
                          ? "bg-card text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs text-foreground transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              >
                <option
                  value="All"
                  className="bg-popover text-popover-foreground"
                >
                  All Categories
                </option>
                <option
                  value="Engineering & Tech"
                  className="bg-popover text-popover-foreground"
                >
                  Engineering & Tech
                </option>
                <option
                  value="Design & Creative"
                  className="bg-popover text-popover-foreground"
                >
                  Design & Creative
                </option>
                <option
                  value="Marketing & Sales"
                  className="bg-popover text-popover-foreground"
                >
                  Marketing & Sales
                </option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Card (Desktop Table View + Mobile Card View) */}
      <Card className="overflow-hidden">
        {/* Desktop / Tablet Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-70">JOB TITLE & DEPT</TableHead>
                <TableHead className="w-55">COMPANY & LOCATION</TableHead>
                <TableHead className="w-27.5">TYPE</TableHead>
                <TableHead className="w-40">COMPENSATION</TableHead>
                <TableHead className="w-32.5">APPLICANTS</TableHead>
                <TableHead className="w-25">STATUS</TableHead>
                <TableHead className="w-35">DEADLINE</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="size-4 animate-spin text-primary" />
                      <span>Loading job postings...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-44 text-center text-muted-foreground"
                  >
                    {jobs.length === 0 ? (
                      <div className="flex flex-col items-center justify-center space-y-2 py-4">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                          <Briefcase className="size-5" />
                        </div>
                        <h4 className="font-semibold text-foreground">No job postings yet</h4>
                        <p className="max-w-sm text-xs text-muted-foreground">
                          Create your first job listing to start receiving applications from qualified candidates.
                        </p>
                        <Button
                          size="xs"
                          className="mt-2 gap-1.5"
                          render={<Link href="/dashboard/recruiter/jobs/new" />}
                        >
                          <Plus className="size-3.5" />
                          <span>Post a Job</span>
                        </Button>
                      </div>
                    ) : (
                      "No job listings found matching your search criteria."
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow key={job.id} className="group">
                    {/* Job Title & Category */}
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Briefcase className="size-4" />
                        </div>
                        <div>
                          <span className="block font-semibold text-foreground">
                            {job.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {job.category}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Company & Location */}
                    <TableCell>
                      <div className="space-y-0.5">
                        <span className="block text-xs font-medium text-foreground">
                          {job.company}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {job.isRemote ? (
                            <Globe className="size-3 text-blue-500" />
                          ) : (
                            <MapPin className="size-3" />
                          )}
                          <span className="max-w-42.5 truncate">
                            {job.isRemote
                              ? `Remote (${job.location})`
                              : job.location}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Type Badge */}
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-normal">
                        {job.type}
                      </Badge>
                    </TableCell>

                    {/* Compensation */}
                    <TableCell>
                      <span className="text-xs font-medium text-foreground">
                        {formatSalary(job)}
                      </span>
                    </TableCell>

                    {/* Applicants */}
                    <TableCell>
                      <Link
                        href={`/dashboard/jobs/${job.id}/applicants`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        <Users className="size-3.5" />
                        <span>{job.applicantsCount} Candidates</span>
                      </Link>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Badge
                        variant={
                          job.status === "Active"
                            ? "success"
                            : job.status === "Closed"
                              ? "outline"
                              : "warning"
                        }
                        className="capitalize"
                      >
                        {job.status}
                      </Badge>
                    </TableCell>

                    {/* Deadline & Posted */}
                    <TableCell>
                      <div className="space-y-0.5 text-xs">
                        <span className="block text-foreground">
                          {job.deadline
                            ? new Date(job.deadline).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "Open"}
                        </span>
                        <span className="block text-[11px] text-muted-foreground">
                          Posted {job.postedAgo}
                        </span>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="xs"
                          variant="ghost"
                          title="View Applicants"
                          render={
                            <Link
                              href={`/dashboard/jobs/${job.id}/applicants`}
                            />
                          }
                        >
                          <Users className="size-3.5" />
                        </Button>

                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => handleToggleStatus(job.id)}
                          title={
                            job.status === "Active" ? "Close Job" : "Reopen Job"
                          }
                          className="text-xs"
                        >
                          {job.status === "Active" ? (
                            <XCircle className="size-3.5 text-muted-foreground hover:text-foreground" />
                          ) : (
                            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                          )}
                        </Button>

                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => handleDeleteJob(job.id)}
                          title="Delete Job"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Responsive Cards View (< md screens) */}
        <div className="divide-y divide-border md:hidden">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-8 text-sm text-muted-foreground">
              <Clock className="size-4 animate-spin text-primary" />
              <span>Loading job postings...</span>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Briefcase className="size-5" />
                  </div>
                  <h4 className="font-semibold text-foreground">No job postings yet</h4>
                  <p className="max-w-xs text-xs text-muted-foreground">
                    Create your first job listing to start receiving applications.
                  </p>
                  <Button
                    size="xs"
                    className="mt-2 gap-1.5"
                    render={<Link href="/dashboard/recruiter/jobs/new" />}
                  >
                    <Plus className="size-3.5" />
                    <span>Post a Job</span>
                  </Button>
                </div>
              ) : (
                "No job listings found matching your search criteria."
              )}
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground">
                      {job.title}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {job.company} · {job.category}
                    </p>
                  </div>
                  <Badge
                    variant={
                      job.status === "Active"
                        ? "success"
                        : job.status === "Closed"
                          ? "outline"
                          : "warning"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                    {job.isRemote ? (
                      <Globe className="size-3" />
                    ) : (
                      <MapPin className="size-3" />
                    )}
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                    <DollarSign className="size-3" />
                    <span>{formatSalary(job)}</span>
                  </span>
                  <span className="rounded-md border border-border px-2 py-1">
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-2 text-xs">
                  <Link
                    href={`/dashboard/jobs/${job.id}/applicants`}
                    className="flex items-center gap-1 font-medium text-primary"
                  >
                    <Users className="size-3.5" />
                    <span>{job.applicantsCount} Applicants</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => handleToggleStatus(job.id)}
                    >
                      {job.status === "Active" ? "Close" : "Reopen"}
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
