import type { ManagedJobPost } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = ''): Promise<ManagedJobPost[]> => {
  try {
    const response = await fetch(`${BASE_URL}/jobs?${query}`, {
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

export const getJobById = async (id: string): Promise<ManagedJobPost | null> => {
  try {
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      cache: "no-store",
    })
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error("Error in getJobById:", error)
    return null
  }
}
