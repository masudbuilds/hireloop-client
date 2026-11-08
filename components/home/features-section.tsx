import {
  Bookmark,
  Building2,
  FileText,
  GraduationCap,
  MousePointerClick,
  Search,
  Target,
  TrendingUp,
} from "lucide-react"

const FEATURES = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Search,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: TrendingUp,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: Building2,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: MousePointerClick,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileText,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: Target,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: GraduationCap,
  },
] as const

export function FeaturesSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span className="size-1.5 rounded-full bg-[#5c53fe]" />
            <span className="font-badge text-xs uppercase tracking-wider text-white/80">
              features job
            </span>
          </div>

          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need to succeed
          </h2>
        </div>

        {/* 4x2 Feature Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#111114] hover:shadow-[0_0_25px_rgba(92,83,254,0.15)]"
            >
              <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#5c53fe] transition-colors group-hover:bg-[#5c53fe] group-hover:text-white">
                <feature.icon className="size-6" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
