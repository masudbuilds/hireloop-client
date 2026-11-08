import Link from "next/link"
import { ArrowRight, Briefcase, CircleDollarSign, MapPin } from "lucide-react"

const MOCK_JOBS = [
  {
    id: "1",
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "$40/hour",
  },
  {
    id: "2",
    title: "Senior Product Designer",
    description:
      "Lead UX strategy and design intuitive interfaces for global high-growth SaaS applications.",
    location: "San Francisco, CA",
    type: "Remote",
    salary: "$65/hour",
  },
  {
    id: "3",
    title: "DevOps Specialist",
    description:
      "Architect resilient cloud infrastructure and optimize continuous deployment pipelines.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$55/hour",
  },
  {
    id: "4",
    title: "Full Stack Engineer",
    description:
      "Build scalable web applications and real-time distributed systems using Next.js and Node.",
    location: "Seattle, WA",
    type: "Remote",
    salary: "$50/hour",
  },
  {
    id: "5",
    title: "Product Manager",
    description:
      "Drive product lifecycle from concept to launch with cross-functional engineering teams.",
    location: "Boston, MA",
    type: "On-site",
    salary: "$60/hour",
  },
  {
    id: "6",
    title: "Data Scientist",
    description:
      "Develop machine learning algorithms and uncover actionable insights from complex datasets.",
    location: "Chicago, IL",
    type: "Hybrid",
    salary: "$58/hour",
  },
] as const

export function JobDiscoverySection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span className="size-1.5 rounded-full bg-[#5c53fe]" />
            <span className="font-badge text-xs uppercase tracking-wider text-white/80">
              Smart job discovery
            </span>
          </div>

          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The roles you&apos;d never find by searching
          </h2>
        </div>

        {/* 3x2 Job Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_JOBS.map((job) => (
            <div
              key={job.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#111114] hover:shadow-[0_0_30px_rgba(92,83,254,0.12)]"
            >
              <div className="flex flex-col gap-3">
                <h3 className="font-heading text-xl font-semibold text-white transition-colors group-hover:text-[#5c53fe]">
                  {job.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {job.description}
                </p>

                {/* Metadata Badges */}
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                    <MapPin className="size-3.5 text-[#5c53fe]" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                    <Briefcase className="size-3.5 text-[#5c53fe]" />
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                    <CircleDollarSign className="size-3.5 text-[#5c53fe]" />
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Apply Now button */}
              <div className="mt-6 border-t border-white/5 pt-4">
                <Link
                  href="/jobs"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:border-[#5c53fe] hover:bg-[#5c53fe] hover:shadow-[0_0_15px_rgba(92,83,254,0.4)]"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all job roles CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5c53fe] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_25px_rgba(92,83,254,0.4)] transition-all duration-200 hover:bg-[#5c53fe]/90 hover:shadow-[0_0_35px_rgba(92,83,254,0.6)]"
          >
            <span>View all job roles</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
