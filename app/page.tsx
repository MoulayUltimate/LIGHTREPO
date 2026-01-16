import { HeroSection } from "@/components/sections/hero-section"
import { StatsBar } from "@/components/sections/stats-bar"
import { MotivationSection } from "@/components/sections/motivation-section"
import { TrustedPartners } from "@/components/sections/trusted-partners"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { ProductDetailsSection } from "@/components/sections/product-details-section"
import { DarkGradientSection } from "@/components/sections/dark-gradient-section"
import { WhyChooseSection } from "@/components/sections/why-choose-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { SaleBanner } from "@/components/sections/sale-banner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MotivationSection />
      <TrustedPartners />
      <ProductShowcase />
      <WhyChooseSection />
      <ProductDetailsSection />
      <FAQSection />
      <ReviewsSection />
      <SaleBanner />
    </>
  )
}
