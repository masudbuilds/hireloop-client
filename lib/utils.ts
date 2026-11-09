export { cn } from "cn"

/**
 * Standardized salary formatter for job listings across the platform.
 */
export function formatSalary(job: {
  minSalary?: string | number | null
  maxSalary?: string | number | null
  salaryFrequency?: string | null
}): string {
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

/**
 * Safely parses and normalizes numerical count values from API or database responses.
 */
export function normalizeCount(
  value: unknown,
  fallback = 0,
  context?: { id?: string; field?: string }
): number {
  const count =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : NaN

  if (Number.isFinite(count) && count >= 0) {
    return count
  }

  if (context?.field && context?.id) {
    console.warn(
      `Invalid ${context.field} for ${context.id}; using ${fallback}.`
    )
  }
  return fallback
}
