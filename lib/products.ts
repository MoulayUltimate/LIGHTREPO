export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  slug: string
  inStock: boolean
  features: string[]
  compatibility: string[]
}

export const products: Product[] = [
  {
    id: "lightburn-pro",
    name: "LightBurn Pro Laser Engraving Software - Multilingual",
    description:
      "LightBurn is layout, editing, and control software for your laser cutter. Import artwork in a variety of common vector graphic and image formats. Arrange, edit, and even create new vector shapes within LightBurn's powerful editor.",
    price: 57.72,
    originalPrice: 209.0,
    image: "/lightburn-software-screenshot.webp",
    slug: "lightburn-pro",
    inStock: true,
    features: [
      "Instant delivery (1-30 minutes)",
      "No extra charges or hidden fees",
      "Safe and secure payments",
      "24/7 customer support",
      "Lifetime activation",
      "12 months free updates",
      "30-day money-back guarantee",
    ],
    compatibility: [
      "Ruida (CO2)",
      "GRBL (Diode and CO2 lasers)",
      "Smoothieboard",
      "TopWisdom",
      "EZCad2 & EZCad2-Lite (Galvo fiber, CO2, and UV)",
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getDiscountPercentage(product: Product): number {
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
}

export const CURRENCY_SYMBOL = "€"
