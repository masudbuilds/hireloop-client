import type { JobApplication, JobApplicationInput } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const applyToAJob = async (data: JobApplicationInput): Promise<{ insertedId?: string; acknowledged?: boolean }> => {
  try {
    const response = await fetch(`${BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Failed to submit application: ${response.status} ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error in applyToAJob:", error)
    throw error
  }
}

export const getApplicationsBySeeker = async (seekerEmail?: string): Promise<JobApplication[]> => {
  try {
    const query = seekerEmail ? `?seekerEmail=${encodeURIComponent(seekerEmail)}` : ""
    const response = await fetch(`${BASE_URL}/applications${query}`, {
      cache: "no-store",
    })
    if (!response.ok) {
      return []
    }
    return await response.json()
  } catch (error) {
    console.error("Error in getApplicationsBySeeker:", error)
    return []
  }
}
