"use client"

import * as React from "react"
import { Loader2, Trash2, Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { ManagedJobPost } from "@/app/dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"

interface DeleteJobDialogProps {
  job: ManagedJobPost
  onDeleted?: (jobId: string) => void
  trigger?: React.ReactElement
}

export function DeleteJobDialog({ job, onDeleted, trigger }: DeleteJobDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDeleteJob = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isDeleting) return

    try {
      setIsDeleting(true)
      const response = await deleteJob(job._id)
      console.log("Delete job response:", response)

      // MongoDB deleteOne returns { acknowledged: true, deletedCount: 1 }
      if (response && (response.deletedCount > 0 || response.acknowledged)) {
        setIsOpen(false)
        toast.add({
          type: "success",
          title: "Job Deleted",
          description: "The job has been permanently deleted.",
        })
        onDeleted?.(job._id)
        router.refresh()
      } else {
        toast.add({
          type: "error",
          title: "Delete Failed",
          description:
            response?.error ||
            response?.message ||
            "Failed to delete the job posting.",
        })
      }
    } catch (error) {
      console.error("Error deleting job:", error)
      toast.add({
        type: "error",
        title: "Error",
        description: "An unexpected error occurred while deleting the job.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const defaultTrigger = (
    <Button
      size="xs"
      variant="ghost"
      title="Delete Job"
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2 className="size-3.5" />
    </Button>
  )

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger render={trigger || defaultTrigger} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete &ldquo;{job.title}&rdquo;. Are you sure you
            want to continue? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} variant="outline">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteJob}
            disabled={isDeleting}
            variant="destructive"
            className="gap-1.5"
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
