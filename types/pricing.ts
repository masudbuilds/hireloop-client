export interface PricingTier {
  name: string
  priceMonthly: string
  priceYearly: string
  description: string
  features: readonly string[]
  isFeatured: boolean
  badge?: string
  cta: string
  href: string
}
