import { HeroSection } from "@/components/hero-section"
import { SiteNavbar } from "@/components/site-navbar"
import { JobDiscoverySection } from "@/components/home/job-discovery"
import { FeaturesSection } from "@/components/home/features-section"
import { PricingSection } from "@/components/home/pricing-section"
import { CtaSection } from "@/components/home/cta-section"
import { SiteFooter } from "@/components/home/site-footer"

export default function Page() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#010103] text-white">
      <SiteNavbar />
      <main>
        {/* 1. Hero with Lower Globe Horizon Stats */}
        <HeroSection />

        {/* 2. Smart Job Discovery */}
        <JobDiscoverySection />

        {/* 3. Features */}
        <FeaturesSection />

        {/* 4. Pricing */}
        <PricingSection />

        {/* 5. Call to Action */}
        <CtaSection />
      </main>

      {/* 6. Footer */}
      <SiteFooter />
    </div>
  )
}
