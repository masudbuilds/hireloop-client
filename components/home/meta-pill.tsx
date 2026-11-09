import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetaPillProps extends React.ComponentProps<"span"> {
  icon: LucideIcon
  label: string
}

export function MetaPill({
  icon: Icon,
  label,
  className,
  ...props
}: MetaPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
        className
      )}
      {...props}
    >
      <Icon className="size-3.5 text-[#5c53fe]" />
      <span>{label}</span>
    </span>
  )
}
