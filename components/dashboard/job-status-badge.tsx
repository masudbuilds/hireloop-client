import * as React from "react"
import { Badge } from "@/components/ui/badge"
import type { JobStatus } from "@/types"
import { cn } from "@/lib/utils"

interface JobStatusBadgeProps extends React.ComponentProps<typeof Badge> {
  status: JobStatus | string
}

export function JobStatusBadge({
  status,
  className,
  ...props
}: JobStatusBadgeProps) {
  const variant =
    status === "Active"
      ? "success"
      : status === "Closed"
        ? "outline"
        : "warning"

  return (
    <Badge
      variant={variant}
      className={cn("capitalize", className)}
      {...props}
    >
      {status}
    </Badge>
  )
}
