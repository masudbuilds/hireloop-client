"use client"
import { Trash2, Trash2Icon } from "lucide-react"

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
import { ManagedJobPost } from "../dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function DeleteJobDialog({ job }: { job: ManagedJobPost }) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteJob = async () => {
    const response = await deleteJob(job._id);
    console.log("Delete job response:", response);
    if(response.deletedCount) {
      setIsOpen(false);
      toast.add({
        title: "Jobs Delelted",
        description: "Job is permenently deleted.",
      })
      router.refresh()
    }
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive"><Trash2 className="size-3.5" /></Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job. Are you sure you want to
            continue? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteJob} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
