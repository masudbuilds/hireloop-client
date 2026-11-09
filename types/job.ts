export type JobStatus = "Active" | "Closed" | "Draft"

export interface JobFormData {
  title: string
  company: string
  category: string
  type: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
  benefits: string
  status: JobStatus
  applicantsCount: number
}

export interface ManagedJobPost extends JobFormData {
  _id: string
  viewsCount: number
  postedAt: string
  postedAgo: string
}

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Sales",
  "Customer Support",
  "Finance & Operations",
  "Human Resources",
  "Data & Analytics",
] as const

export type JobCategory = (typeof JOB_CATEGORIES)[number]

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const

export type JobType = (typeof JOB_TYPES)[number]

export const SALARY_FREQUENCIES = [
  { label: "per year", value: "per year" },
  { label: "per month", value: "per month" },
  { label: "per hour", value: "per hour" },
] as const

export type SalaryFrequency = (typeof SALARY_FREQUENCIES)[number]["value"]

export const INITIAL_FORM_DATA: JobFormData = {
  title: "",
  company: "",
  category: "Engineering & Tech",
  type: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  salaryFrequency: "per year",
  responsibilities: "",
  requirements: "",
  benefits: "",
  status: "Draft",
  applicantsCount: 0,
}
