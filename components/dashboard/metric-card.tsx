import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps extends React.ComponentProps<typeof Card> {
  title: string
  value: number | string
  icon: LucideIcon
  iconContainerClassName?: string
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  iconContainerClassName,
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn("p-4", className)} {...props}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-lg",
            iconContainerClassName || "bg-primary/10 text-primary"
          )}
        >
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <h3 className="text-lg font-bold text-foreground">{value}</h3>
        </div>
      </div>
    </Card>
  )
}
