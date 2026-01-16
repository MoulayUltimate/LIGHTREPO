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
      <StatsBar dict={dict.stats} />
      <MotivationSection dict={dict.motivation} />
      <TrustedPartners dict={dict.trustedPartners} />
      <ProductShowcase dict={dict.productShowcase} common={dict.common} />
      <WhyChooseSection dict={dict.whyChoose} />
      <ProductDetailsSection dict={dict.productDetails} />
      <FAQSection dict={dict.faq} />
      <ReviewsSection dict={dict.reviews} />
      <SaleBanner dict={dict.saleBanner} />
    </>
  )
}
