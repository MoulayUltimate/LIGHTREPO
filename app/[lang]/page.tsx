export const runtime = 'edge'

import { getDictionary } from "@/lib/dictionary"
import { SalesHeroSection } from "@/components/sections/sales-hero-section"
import { StatsBar } from "@/components/sections/stats-bar"
import { ProductDetailsSection } from "@/components/sections/product-details-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { TrustedPartners } from "@/components/sections/trusted-partners"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      {/* Main Sales Hero - focused conversion section */}
      <SalesHeroSection dict={dict.hero} common={dict.common} />

      {/* Stats Bar - quick value props */}
      <StatsBar dict={dict.stats} />

      {/* Product Details - features & compatibility */}
      <ProductDetailsSection dict={dict.productDetails} />

      {/* Trusted Partners - social proof */}
      <TrustedPartners dict={dict.trustedPartners} />

      {/* Reviews - customer testimonials */}
      <ReviewsSection dict={dict.reviews} />

      {/* FAQ - address objections */}
      <FAQSection dict={dict.faq} />
    </>
  )
}
