"use client"

import * as React from "react"
import { Bookmark, Check, CheckCircle2, ExternalLink, Send, Sparkles, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/auth-client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"

interface JobApplyModalProps {
  jobId: string
  jobTitle: string
  company: string
  location?: string
  salary?: string
  className?: string
  variant?: "primary" | "secondary" | "header"
}

export function JobApplyModal({
  jobId,
  jobTitle,
  company,
  location,
  salary,
  className,
  variant = "primary",
}: JobApplyModalProps) {
  const { data: session } = useSession()
  const [open, setOpen] = React.useState(false)
  const [hasApplied, setHasApplied] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [formData, setFormData] = React.useState({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    portfolioUrl: "",
    note: "",
  })

  // Sync session details if loaded after mount
  React.useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || session.user.name || "",
        email: prev.email || session.user.email || "",
      }))
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    setIsSubmitting(false)
    setHasApplied(true)
    setOpen(false)

    toast.add({
      title: "Application Submitted! 🎉",
      description: `Your application for ${jobTitle} at ${company} was sent successfully.`,
      type: "success",
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            disabled={hasApplied}
            className={cn(
              "cursor-pointer font-semibold transition-all duration-300",
              variant === "header" &&
                "h-11 rounded-xl bg-[#5c53fe] px-6 text-sm font-semibold text-white shadow-[0_0_25px_rgba(92,83,254,0.4)] hover:bg-[#5c53fe]/90 sm:h-12 sm:px-8 sm:text-base",
              variant === "primary" &&
                "h-12 w-full rounded-xl bg-[#5c53fe] text-base font-semibold text-white shadow-[0_0_25px_rgba(92,83,254,0.35)] hover:bg-[#5c53fe]/90",
              variant === "secondary" &&
                "h-11 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:border-white/20 hover:bg-white/10",
              hasApplied &&
                "cursor-default border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-none hover:bg-emerald-500/10",
              className
            )}
          >
            {hasApplied ? (
              <>
                <Check className="size-4" />
                <span>Applied</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                <span>Apply Now</span>
              </>
            )}
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="w-full border-l border-white/10 bg-[#0c0c0e] p-6 text-white sm:max-w-md"
      >
        <SheetHeader className="pb-4 border-b border-white/10">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="size-1.5 rounded-full bg-[#5c53fe]" />
            <span>Quick Application</span>
          </div>
          <SheetTitle className="mt-2 font-heading text-xl font-bold text-white">
            Apply to {company}
          </SheetTitle>
          <SheetDescription className="text-xs text-white/50">
            {jobTitle} {location ? `· ${location}` : ""} {salary ? `· ${salary}` : ""}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/80">Full Name *</label>
            <input
              required
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/80">Email Address *</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/80">Portfolio or LinkedIn URL</label>
            <input
              type="url"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              placeholder="https://linkedin.com/in/alex"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/80">Note to Hiring Manager</label>
            <textarea
              rows={3}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Briefly describe why you are a great match for this role..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-center">
            <Upload className="mx-auto size-5 text-white/40" />
            <p className="mt-1 text-xs text-white/70">Attach Resume / CV (PDF, DOCX)</p>
            <p className="text-[10px] text-white/40">Max file size: 5MB</p>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full cursor-pointer rounded-xl bg-[#5c53fe] text-sm font-semibold text-white shadow-[0_0_20px_rgba(92,83,254,0.35)] hover:bg-[#5c53fe]/90"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Submit Application</span>
                </>
              )}
            </Button>
            <p className="mt-2 text-center text-[11px] text-white/40">
              By applying, you agree to share your profile with {company}.
            </p>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export function SaveJobButton({ jobTitle }: { jobTitle: string }) {
  const [saved, setSaved] = React.useState(false)

  const handleToggle = () => {
    const next = !saved
    setSaved(next)
    toast.add({
      title: next ? "Job Saved" : "Job Removed",
      description: next
        ? `${jobTitle} has been saved to your bookmarks.`
        : `${jobTitle} was removed from your saved jobs.`,
      type: "info",
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={saved ? "Unsave job" : "Save job"}
      className={cn(
        "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-colors sm:size-12",
        saved
          ? "border-[#5c53fe]/50 bg-[#5c53fe]/15 text-[#5c53fe]"
          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
      )}
    >
      <Bookmark className={cn("size-5", saved && "fill-current")} />
    </button>
  )
}
