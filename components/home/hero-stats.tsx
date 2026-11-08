import { Briefcase, Building2, Users, Star } from "lucide-react"

const STATS = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: Briefcase,
  },
  {
    value: "12K",
    label: "Companies",
    icon: Building2,
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: Users,
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: Star,
  },
] as const

export function HeroStats() {
  return (
    <div className="relative mx-auto mt-24 w-full max-w-6xl px-4 sm:mt-32 sm:px-6 lg:mt-36 lg:px-8">
      {/* Sub-section heading */}
      <h2 className="mx-auto max-w-2xl text-center font-heading text-lg font-medium leading-relaxed text-white/90 sm:text-xl lg:text-2xl">
        Assisting over 15,000 job seekers find their dream positions.
      </h2>

      {/* 4 Stat Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0c0c0e]/80 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#111114]/90 hover:shadow-[0_0_25px_rgba(92,83,254,0.15)]"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#5c53fe] transition-colors group-hover:bg-[#5c53fe] group-hover:text-white">
              <stat.icon className="size-6" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm font-normal text-white/60">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
