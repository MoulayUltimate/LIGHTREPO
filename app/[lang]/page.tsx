export const runtime = 'edge'

import { getDictionary } from "@/lib/dictionary"
import { OfferBanner } from "@/components/sections/offer-banner"
import { SalesHeroSection } from "@/components/sections/sales-hero-section"
import { StatsBar } from "@/components/sections/stats-bar"
import { ProblemSection } from "@/components/sections/problem-section"
import { SolutionSection } from "@/components/sections/solution-section"
import { MotivationSection } from "@/components/sections/motivation-section"
import { ProductDetailsSection } from "@/components/sections/product-details-section"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { WhyChooseSection } from "@/components/sections/why-choose-section"
import { TrustedPartners } from "@/components/sections/trusted-partners"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { FAQSection } from "@/components/sections/faq-section"
import { SaleBanner } from "@/components/sections/sale-banner"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      {/* Offer + hero */}
      <OfferBanner dict={dict.hero} />
      <SalesHeroSection dict={dict.hero} common={dict.common} />
      <StatsBar dict={dict.stats} />

      {/* Problem → solution */}
      <ProblemSection dict={dict.problem} />
      <SolutionSection dict={dict.solution} />

      {/* Informational sections */}
      <MotivationSection dict={dict.motivation} />
      <ProductDetailsSection dict={dict.productDetails} />
      <ProductShowcase dict={dict.productShowcase} common={dict.common} />
      <WhyChooseSection dict={dict.whyChoose} />

      {/* Proof */}
      <TrustedPartners dict={dict.trustedPartners} />
      <ReviewsSection dict={dict.reviews} />

      {/* Objections + closing offer */}
      <FAQSection dict={dict.faq} />
      <SaleBanner dict={dict.saleBanner} />
    </>
  )
}
