export type ApplicationStatus =
  | "Applied"
  | "In Review"
  | "Shortlisted"
  | "Interview"
  | "Offered"
  | "Rejected"

export interface JobApplication {
  _id?: string
  jobId: string
  jobTitle: string
  company: string
  companyLogo?: string
  location?: string
  salary?: string
  jobType?: string
  workplace?: string
  seekerName: string
  seekerEmail: string
  seekerPhoto?: string
  portfolioUrl?: string
  note?: string
  resumeUrl?: string
  status: ApplicationStatus
  appliedAt: string
  appliedAgo?: string
}

export type JobApplicationInput = Omit<JobApplication, "_id">

export interface ApplicationStats {
  totalApplied: number
  inReview: number
  shortlisted: number
  interviews: number
  offered: number
  rejected: number
  successRate: string
}
