export const runtime = 'edge'

import { getDictionary } from "@/lib/dictionary"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsBar } from "@/components/sections/stats-bar"
import { MotivationSection } from "@/components/sections/motivation-section"
import { TrustedPartners } from "@/components/sections/trusted-partners"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { ProductDetailsSection } from "@/components/sections/product-details-section"
import { WhyChooseSection } from "@/components/sections/why-choose-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { SaleBanner } from "@/components/sections/sale-banner"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      <HeroSection dict={dict.hero} common={dict.common} />
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
