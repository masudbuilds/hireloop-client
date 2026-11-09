import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.ComponentProps<"div"> {
  badge?: string
  title: string
  description?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
      {...props}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <span className="size-1.5 rounded-full bg-[#5c53fe]" />
          <span className="font-badge text-xs uppercase tracking-wider text-white/80">
            {badge}
          </span>
        </div>
      )}

      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl text-base text-white/60 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
