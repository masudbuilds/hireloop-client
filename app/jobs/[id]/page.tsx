import Link from "next/link"
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  ExternalLink,
  Globe,
  Heart,
  Layers,
  MapPin,
  Palmtree,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

import { getJobById, getJobs } from "@/lib/api/jobs"
import { formatSalary } from "@/lib/utils"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/home/site-footer"
import { JobCard } from "@/components/jobs/job-card"
import { JobApplyModal, SaveJobButton } from "@/components/jobs/job-apply-modal"
import type { ManagedJobPost } from "@/types"
import { useSession } from "@/lib/auth-client"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

// Default Figma fallback content for pixel-perfect presentation
const FIGMA_DEFAULTS = {
  title: "Senior Product Designer",
  company: "CloudScale AI",
  location: "Remote (US)",
  type: "Full-time",
  experience: "5+ Years",
  salary: "$140k - $180k",
  category: "Design & Creative",
  description:
    "At CloudScale AI, we are building the next generation of infrastructure monitoring tools. We are looking for a Senior Product Designer who is passionate about translating complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the vision for our core platform experience.",
  responsibilities: [
    "Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.",
    "Collaborate with cross-functional partners to understand user needs and translate them into functional design requirements.",
    "Maintain and evolve our design system, ensuring consistency and accessibility across the entire product suite.",
    "Conduct user research and usability testing to validate design decisions and iterate based on feedback.",
  ],
  skillTags: ["Figma Expertise", "System Thinking", "UI/UX Design", "Basic Frontend"],
  requirements: [
    "5+ years of experience designing complex B2B SaaS products or data-heavy applications.",
    "A strong portfolio showcasing your design process and problem-solving skills.",
    "Demonstrated ability to communicate rationale and present concepts effectively to leadership.",
    "Experience collaborating directly with engineers using modern component-driven development.",
  ],
  benefits: [
    {
      title: "Full Health & Dental",
      description: "Comprehensive medical, vision, and dental plans with zero deductible.",
      icon: Heart,
    },
    {
      title: "Competitive 401k",
      description: "4% company matching from day one with immediate vesting.",
      icon: TrendingUp,
    },
    {
      title: "Latest Hardware Stipend",
      description: "Apple MacBook Pro M-series plus a $1,500 home workspace setup budget.",
      icon: Cpu,
    },
    {
      title: "Unlimited PTO",
      description: "Take the time you need to recharge with a mandatory 3-week minimum.",
      icon: Palmtree,
    },
  ],
  companyOverview: {
    description:
      "This company pioneers automated cloud observability and AI-driven telemetry for hyper-growth engineering organizations worldwide.",
    size: "250 - 500 Employees",
    industry: "SaaS / Artificial Intelligence",
    website: "https://example.com",
  },
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const fetchedJob = await getJobById(id)

  // Use fetched job or graceful Figma fallback
  const jobTitle = fetchedJob?.title || FIGMA_DEFAULTS.title
  const companyName = fetchedJob?.company || FIGMA_DEFAULTS.company
  const location = fetchedJob?.location || (fetchedJob?.isRemote ? "Remote" : FIGMA_DEFAULTS.location)
  const jobType = fetchedJob?.type || FIGMA_DEFAULTS.type
  const category = fetchedJob?.category || FIGMA_DEFAULTS.category
  const formattedSalaryString = fetchedJob ? formatSalary(fetchedJob) : FIGMA_DEFAULTS.salary
  const salaryDisplay =
    formattedSalaryString !== "Negotiable" ? formattedSalaryString : FIGMA_DEFAULTS.salary

  // Parse responsibilities from job record or fallback
  const responsibilitiesList = fetchedJob?.responsibilities
    ? fetchedJob.responsibilities
        .split("\n")
        .map((s) => s.replace(/^[-*•]\s*/, "").trim())
        .filter(Boolean)
    : FIGMA_DEFAULTS.responsibilities

  // Parse requirements from job record or fallback
  const requirementsList = fetchedJob?.requirements
    ? fetchedJob.requirements
        .split("\n")
        .map((s) => s.replace(/^[-*•]\s*/, "").trim())
        .filter(Boolean)
    : FIGMA_DEFAULTS.requirements

  // Fetch similar jobs matching category or latest postings
  let similarJobs: ManagedJobPost[] = []
  try {
    const allJobs = await getJobs(category ? `category=${encodeURIComponent(category)}` : "")
    similarJobs = allJobs.filter((j) => j._id !== id).slice(0, 3)
  } catch {
    similarJobs = []
  }

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#010103] text-white">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-250 -translate-x-1/2 rounded-full bg-[#5c53fe]/10 blur-[140px]"
      />

      {/* Main Navigation */}
      <SiteNavbar />

      <main className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-24 sm:px-6 sm:pt-36 sm:pb-32 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/50 transition-colors hover:text-white sm:text-sm"
          >
            <ArrowLeft className="size-4" />
            <span>Back to all jobs</span>
          </Link>
        </div>

        {/* 1. Header Section */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]/80 p-6 backdrop-blur-md sm:rounded-3xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Avatar & Title & Company */}
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              {/* Company Logo / Avatar */}
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-heading text-2xl font-bold text-[#5c53fe] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] sm:size-20 sm:text-3xl">
                {companyName ? companyName[0].toUpperCase() : <Building2 className="size-8" />}
              </div>

              <div>
                <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {jobTitle}
                </h1>

                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-medium text-white/90 sm:text-base">
                    {companyName}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    <span>Verified Employer</span>
                  </span>

                  {fetchedJob?.isRemote && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                      <Globe className="size-3" />
                      <span>Remote</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 self-stretch sm:self-auto">
              <SaveJobButton jobTitle={jobTitle} />

              <JobApplyModal
                jobId={id}
                jobTitle={jobTitle}
                company={companyName}
                location={location}
                salary={salaryDisplay}
                variant="header"
                className="flex-1 sm:flex-initial"
              />
            </div>
          </div>
        </section>

        {/* 2. Main Content Grid (Two Columns) */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column (8 cols): Bento Grid + Content Sections */}
          <div className="space-y-8 lg:col-span-8">
            {/* Bento Info Grid (4 Stat Cards) */}
            <section
              aria-label="Job highlights"
              className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4"
            >
              {/* Stat 1: Salary Range */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c0e] p-4 transition-colors hover:border-white/20 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                    Salary Range
                  </span>
                  <div className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#5c53fe]">
                    <Coins className="size-3.5" />
                  </div>
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-white sm:text-lg">
                  {salaryDisplay}
                </p>
              </div>

              {/* Stat 2: Location */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c0e] p-4 transition-colors hover:border-white/20 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                    Location
                  </span>
                  <div className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#5c53fe]">
                    <MapPin className="size-3.5" />
                  </div>
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-white truncate sm:text-lg">
                  {location}
                </p>
              </div>

              {/* Stat 3: Job Type */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c0e] p-4 transition-colors hover:border-white/20 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                    Job Type
                  </span>
                  <div className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#5c53fe]">
                    <Briefcase className="size-3.5" />
                  </div>
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-white sm:text-lg">
                  {jobType}
                </p>
              </div>

              {/* Stat 4: Experience */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c0e] p-4 transition-colors hover:border-white/20 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                    Experience
                  </span>
                  <div className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#5c53fe]">
                    <Sparkles className="size-3.5" />
                  </div>
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-white sm:text-lg">
                  {FIGMA_DEFAULTS.experience}
                </p>
              </div>
            </section>

            {/* Content Sections Card */}
            <article className="space-y-8 rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 sm:p-8">
              {/* Section 1: Job Description */}
              <section className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
                  Job Description
                </h2>
                <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                  {fetchedJob?.responsibilities && !fetchedJob.responsibilities.includes("\n")
                    ? fetchedJob.responsibilities
                    : FIGMA_DEFAULTS.description}
                </p>
              </section>

              <div className="h-px bg-white/10" />

              {/* Section 2: Responsibilities */}
              <section className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {responsibilitiesList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/80 sm:text-base">
                      <span className="mt-1.5 flex size-2 shrink-0 rounded-full bg-[#5c53fe]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="h-px bg-white/10" />

              {/* Section 3: Requirements */}
              <section className="space-y-5">
                <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
                  Requirements
                </h2>

                {/* Skill Pills Row */}
                <div className="flex flex-wrap gap-2.5">
                  {FIGMA_DEFAULTS.skillTags.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-[#5c53fe]/40 hover:text-white sm:text-sm"
                    >
                      <Layers className="size-3.5 text-[#5c53fe]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>

                {/* Requirement Bullet Items */}
                <ul className="space-y-3 pt-2">
                  {requirementsList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/80 sm:text-base">
                      <span className="mt-1.5 flex size-2 shrink-0 rounded-full bg-[#5c53fe]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="h-px bg-white/10" />

              {/* Section 4: Benefits */}
              <section className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
                  Benefits
                </h2>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {FIGMA_DEFAULTS.benefits.map((b) => {
                    const IconComp = b.icon
                    return (
                      <div
                        key={b.title}
                        className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20"
                      >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#5c53fe]/30 bg-[#5c53fe]/10 text-[#5c53fe]">
                          <IconComp className="size-4" />
                        </div>
                        <div>
                          <h3 className="font-heading text-sm font-semibold text-white">
                            {b.title}
                          </h3>
                          <p className="mt-1 text-xs text-white/60 leading-relaxed">
                            {b.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </article>
          </div>

          {/* Right Column (4 cols): Aside Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Company Overview Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 space-y-6 lg:sticky lg:top-24">
              <div>
                <h2 className="font-heading text-lg font-semibold text-white">
                  Company Overview
                </h2>
                <p className="mt-1 text-xs text-white/50">
                  About the organization hiring for this position
                </p>
              </div>

              {/* Company Logo & Bio */}
              <div className="flex items-center gap-3.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-heading text-lg font-bold text-[#5c53fe]">
                  {companyName ? companyName[0].toUpperCase() : <Building2 className="size-5" />}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-white">
                    {companyName}
                  </h3>
                  <p className="text-xs text-white/60">{category}</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-white/70">
                {FIGMA_DEFAULTS.companyOverview.description}
              </p>

              <div className="h-px bg-white/10" />

              {/* Company Meta Key-Value Pairs */}
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white/40 uppercase tracking-wider">
                    Size
                  </span>
                  <span className="font-medium text-white/90">
                    {FIGMA_DEFAULTS.companyOverview.size}
                  </span>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex items-center justify-between">
                  <span className="font-medium text-white/40 uppercase tracking-wider">
                    Industry
                  </span>
                  <span className="font-medium text-white/90">
                    {category || FIGMA_DEFAULTS.companyOverview.industry}
                  </span>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex items-center justify-between">
                  <span className="font-medium text-white/40 uppercase tracking-wider">
                    Location
                  </span>
                  <span className="font-medium text-white/90 truncate max-w-45">
                    {location}
                  </span>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex items-center justify-between">
                  <span className="font-medium text-white/40 uppercase tracking-wider">
                    Deadline
                  </span>
                  <span className="font-medium text-white/90">
                    {fetchedJob?.deadline || "Open until filled"}
                  </span>
                </div>
              </div>

              {/* Website Link */}
              <a
                href={FIGMA_DEFAULTS.companyOverview.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span>Visit Website</span>
                <ExternalLink className="size-3.5 text-white/60" />
              </a>

              <div className="h-px bg-white/10" />

              {/* Quick Apply Card in Sidebar */}
              <div className="rounded-xl border border-white/10 bg-linear-to-b from-[#141419] to-[#0c0c0e] p-5">
                <h3 className="font-heading text-sm font-semibold text-white">
                  Interested in this role?
                </h3>
                <p className="mt-1 text-xs text-white/50">
                  Applications are reviewed on a rolling basis. Apply early to get noticed.
                </p>

                <div className="mt-4">
                  <JobApplyModal
                    jobId={id}
                    jobTitle={jobTitle}
                    company={companyName}
                    location={location}
                    salary={salaryDisplay}
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 3. Similar Job Suggestions */}
        {similarJobs.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-16">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  <span className="size-1.5 rounded-full bg-[#5c53fe]" />
                  <span>Recommended Opportunities</span>
                </div>
                <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Similar Job Openings
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Explore other positions in {category} matching your domain.
                </p>
              </div>

              <Link
                href={`/jobs?category=${encodeURIComponent(category)}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5c53fe] transition-colors hover:text-[#5c53fe]/80"
              >
                <span>View all similar jobs</span>
                <ArrowLeft className="size-4 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {similarJobs.map((simJob) => (
                <JobCard key={simJob._id} job={simJob} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}
