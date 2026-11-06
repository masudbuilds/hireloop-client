import { HeroSection } from "@/components/hero-section"
import { SiteNavbar } from "@/components/site-navbar"

export default function Page() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#010103] text-white">
      <SiteNavbar />
      <HeroSection />
    </div>
  )
}
