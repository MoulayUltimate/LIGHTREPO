"use client"

import Image from "next/image"
import { Check, ArrowRight } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"
import { useCurrency } from "@/components/currency-provider"
import { products } from "@/lib/products"

const fallback = {
  eyebrow: "The solution",
  title: "LightBurn Pro: the complete toolkit",
  subtitle: "Professional laser software that stays out of your way.",
  points: [
    "Runs Ruida, GRBL, Smoothieboard, TopWisdom and EZCad2 controllers",
    "Ready to cut in minutes, not hours",
    "Pay once, use forever — no subscription, no hidden fees",
    "24/7 support from people who work with lasers",
    "Professional results without the complexity",
  ],
  cta: "Try LightBurn risk-free today — only {price}",
}

export function SolutionSection({ dict }: { dict?: any }) {
  const product = products[0]
  const { price, symbol } = useCurrency()
  const addItem = useCartStore((state) => state.addItem)
  const openModal = useModalStore((state) => state.openModal)

  const points: string[] = dict?.points || fallback.points
  const cta = (dict?.cta || fallback.cta).replace("{price}", `${symbol}${price.toFixed(2)}`)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              {dict?.eyebrow || fallback.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              {dict?.title || fallback.title}
            </h2>
            <p className="mt-4 text-lg text-gray-500">{dict?.subtitle || fallback.subtitle}</p>

            <ul className="mt-8 space-y-4">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                addItem(product, 1)
                openModal()
              }}
              className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
            >
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Visual */}
          <div className="relative">
            <Image
              src="/lightburn-software-screenshot.webp"
              alt={product.name}
              width={700}
              height={520}
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
