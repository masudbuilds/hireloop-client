export type Role = "seeker" | "recruiter" | "admin"

export interface UserProfile {
  id: string
  name: string
  email: string
  role: Role
  image?: string | null
}
