import { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page"


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const createJob = async (data: JobFormData) => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const deleteJob = async (jobId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      const errorText = await response.text()
      try {
        return JSON.parse(errorText)
      } catch {
        return { error: `Server error: ${response.status}`, deletedCount: 0 }
      }
    }
    return await response.json()
  } catch (error) {
    console.error("Error in deleteJob:", error)
    return { error: (error as Error).message, deletedCount: 0 }
  }
}