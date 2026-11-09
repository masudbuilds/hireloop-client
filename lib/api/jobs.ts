import type { ManagedJobPost } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (): Promise<ManagedJobPost[]> => {
  try {
    const response = await fetch(`${BASE_URL}/jobs`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error in getJobs:", error)
    return []
  }
}
