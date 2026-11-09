"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Globe,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { createJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"

export interface JobFormData {
  title: string
  company: string
  category: string
  type: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
  benefits: string
  status: "Active" | "Closed" | "Draft"
  applicantsCount: number
}

const INITIAL_FORM_DATA: JobFormData = {
  title: "",
  company: "",
  category: "Engineering & Tech",
  type: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  salaryFrequency: "per year",
  responsibilities: "",
  requirements: "",
  benefits: "",
  status: "Draft",
  applicantsCount: 0,
}

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Sales",
  "Customer Support",
  "Finance & Operations",
  "Human Resources",
  "Data & Analytics",
]

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

const SALARY_FREQUENCIES = [
  { label: "per year", value: "per year" },
  { label: "per month", value: "per month" },
  { label: "per hour", value: "per hour" },
]

export default function NewJobPage() {
  const { data: session } = useSession()
  const [formData, setFormData] = React.useState<JobFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // Auto-fill company name if recruiter is signed in and field is blank
  React.useEffect(() => {
    if (session?.user?.name && !formData.company) {
      setFormData((prev) => ({ ...prev, company: session.user.name }))
    }
  }, [session?.user?.name, formData.company])

  // Simple and direct field updater
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const updatedValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }))
  }

  // Quick handler for pill-style Job Type buttons
  const handleTypeSelect = (selectedType: string) => {
    setFormData((prev) => ({ ...prev, type: selectedType }))
  }

  // Handle form submission and data collection
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const jobData: JobFormData = { ...formData }

    const result = await createJob(jobData)
    console.log("Job data submitted to API:", jobData, "Result:", result)

    setErrorMessage(null)

    // Basic validation
    if (!formData.title.trim()) {
      setErrorMessage("Please enter a Job Title.")
      return
    }
    if (!formData.company.trim()) {
      setErrorMessage("Please enter a Company Name.")
      return
    }
    if (!formData.responsibilities.trim()) {
      setErrorMessage("Please describe the Key Responsibilities.")
      return
    }
    if (!formData.requirements.trim()) {
      setErrorMessage("Please describe the Qualifications & Requirements.")
      return
    }

    setIsSubmitting(true)

    try {
      // Collected form data ready to be passed to an API endpoint or backend
      console.log("Collected Job Data:", formData)
      toast.add({
        type: "success",
        title: "Job Posted",
        description: "Your job listing has been successfully published.",
      })

      // Simulate submission network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      setSubmitSuccess(true)
    } catch (err) {
      console.error("Failed to post job:", err)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA)
    setSubmitSuccess(false)
    setErrorMessage(null)
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/dashboard/recruiter/jobs"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            <span>Manage Jobs</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">Create New Listing</span>
        </div>

        {/* Top Action Button */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            form="job-post-form"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <Clock className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            <span>Publish Job</span>
          </Button>
        </div>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Post a New Job
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Fill in the position specifications to attract qualified talent across our network.
        </p>
      </div>

      {/* Success Notification Banner */}
      {submitSuccess && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div className="flex-1">
              <h4 className="font-semibold">Job listing posted successfully!</h4>
              <p className="mt-0.5 text-sm opacity-90">
                Your job post for <strong>{formData.title || "the role"}</strong> at{" "}
                <strong>{formData.company || "your company"}</strong> has been registered.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className="bg-background text-foreground"
                >
                  Post Another Job
                </Button>
                <Button
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/dashboard/recruiter/jobs" />}
                >
                  View All Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-destructive">
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Two-Column Grid: Form (60%) + Live Preview (40%) */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Form Configuration Panels */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <form id="job-post-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">1. Basic Information</CardTitle>
                <CardDescription>
                  Specify the core identity and classification of the vacancy.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Job Title */}
                <div className="space-y-1.5">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Job Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    className="h-10"
                  />
                </div>

                {/* Company Name & Category */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Company Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. HirePulse Network"
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Job Category <span className="text-destructive">*</span>
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                    >
                      {JOB_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-popover text-popover-foreground">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Job Type Pill Selection */}
                <div className="space-y-2 pt-1">
                  <Label className="text-sm font-medium">
                    Job Type <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {JOB_TYPES.map((t) => {
                      const isSelected = formData.type === t
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleTypeSelect(t)}
                          className={cn(
                            "inline-flex h-9 items-center justify-center rounded-lg px-4 text-xs font-medium transition-all sm:text-sm",
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/30"
                              : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Location, Compensation & Timeline */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">
                  2. Location, Compensation & Timeline
                </CardTitle>
                <CardDescription>
                  Define workplace logistics, remuneration terms, and deadlines.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Remote Work Allowed Toggle */}
                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-border bg-muted/30 p-3.5 transition-colors hover:bg-muted/50">
                  <div className="flex items-start gap-3">
                    <Globe className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                    <div>
                      <span className="block text-sm font-medium text-foreground">
                        Remote Work Allowed (isRemote)
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Enable worldwide or distributed candidate applications
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleChange}
                    className="mt-1 size-4 rounded-sm border-input text-primary focus:ring-ring"
                  />
                </label>

                {/* Location & Application Deadline */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Job Location
                    </Label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder={formData.isRemote ? "e.g. Remote / Worldwide" : "e.g. New York, USA"}
                        className="h-10 pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="deadline" className="text-sm font-medium">
                      Application Deadline
                    </Label>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="h-10 pl-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-1.5 pt-1">
                  <Label className="text-sm font-medium">Salary Range</Label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Min Salary / Rate</span>
                      <div className="relative">
                        <DollarSign className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                        <Input
                          id="minSalary"
                          name="minSalary"
                          type="number"
                          value={formData.minSalary}
                          onChange={handleChange}
                          placeholder="80,000"
                          className="h-10 pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Max Salary / Rate</span>
                      <div className="relative">
                        <DollarSign className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                        <Input
                          id="maxSalary"
                          name="maxSalary"
                          type="number"
                          value={formData.maxSalary}
                          onChange={handleChange}
                          placeholder="120,000"
                          className="h-10 pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Frequency</span>
                      <select
                        id="salaryFrequency"
                        name="salaryFrequency"
                        value={formData.salaryFrequency}
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                      >
                        {SALARY_FREQUENCIES.map((f) => (
                          <option key={f.value} value={f.value} className="bg-popover text-popover-foreground">
                            {f.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Responsibilities & Requirements */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">
                  3. Responsibilities & Requirements
                </CardTitle>
                <CardDescription>
                  Elaborate on candidate expectations, technical tasks, and qualifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Responsibilities */}
                <div className="space-y-1.5">
                  <Label htmlFor="responsibilities" className="text-sm font-medium">
                    Key Responsibilities <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    required
                    rows={5}
                    value={formData.responsibilities}
                    onChange={handleChange}
                    placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                  />
                </div>

                {/* Qualifications & Requirements */}
                <div className="space-y-1.5">
                  <Label htmlFor="requirements" className="text-sm font-medium">
                    Qualifications & Requirements <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    required
                    rows={5}
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures&#10;• Solid understanding of DOM performance and component-driven designs&#10;• Experience partnering closely with product teams and UI/UX designers"
                  />
                </div>

                {/* Benefits & Perks (Optional) */}
                <div className="space-y-1.5">
                  <Label htmlFor="benefits" className="text-sm font-medium">
                    Benefits & Perks <span className="text-xs text-muted-foreground">(Optional)</span>
                  </Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    rows={3}
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="• Health, dental, and vision insurance&#10;• 401(k) matching&#10;• Remote workspace stipend&#10;• Flexible PTO policy"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bottom Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                nativeButton={false}
                render={<Link href="/dashboard/recruiter/jobs" />}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <Clock className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                <span>Publish Job</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Preview Card (Matching Figma 40% Live Preview) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Eye className="size-3.5 text-primary" />
                <span>Live Seeker Preview</span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                <Sparkles className="size-3" />
                Real-time
              </span>
            </div>

            <Card className="overflow-hidden border-border bg-card shadow-md">
              <div className="h-2 bg-primary" />
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                      {formData.company ? formData.company[0].toUpperCase() : <Building2 className="size-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {formData.company || "Your Company Name"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {formData.category}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {formData.type}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {formData.title || "Untitled Position"}
                  </h3>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 p-5 pt-0">
                {/* Meta details: Location, Salary, Remote */}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                    <MapPin className="size-3" />
                    <span>
                      {formData.location || (formData.isRemote ? "Remote" : "Location unspecified")}
                    </span>
                  </span>

                  {formData.isRemote && (
                    <span className="flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-1 text-blue-600 dark:text-blue-400">
                      <Globe className="size-3" />
                      <span>Remote Allowed</span>
                    </span>
                  )}

                  {(formData.minSalary || formData.maxSalary) && (
                    <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="size-3" />
                      <span>
                        {formData.minSalary ? `$${Number(formData.minSalary).toLocaleString()}` : "$0"}
                        {formData.maxSalary ? ` - $${Number(formData.maxSalary).toLocaleString()}` : "+"}
                        {" "}{formData.salaryFrequency}
                      </span>
                    </span>
                  )}
                </div>

                {/* Responsibilities snippet */}
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Responsibilities
                  </span>
                  <p className="line-clamp-3 text-xs leading-relaxed text-foreground/80">
                    {formData.responsibilities ||
                      "Detailed responsibilities will be shown to applicants here once defined in the form."}
                  </p>
                </div>

                {/* Requirements snippet */}
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Requirements
                  </span>
                  <p className="line-clamp-3 whitespace-pre-line text-xs leading-relaxed text-foreground/80">
                    {formData.requirements ||
                      "Key requirements and competencies will appear here."}
                  </p>
                </div>

                {/* Action button mock */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {formData.deadline
                        ? `Closes ${new Date(formData.deadline).toLocaleDateString()}`
                        : "Open until filled"}
                    </span>
                    <Button size="sm" disabled className="h-8 text-xs">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
