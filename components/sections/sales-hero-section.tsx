"use client"

import Image from "next/image"
import { Check, Star, Zap, Download } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"
import { useCurrency } from "@/components/currency-provider"
import { PaymentMarks } from "@/components/ui/payment-marks"
import { products } from "@/lib/products"

export function SalesHeroSection({ dict, common }: { dict?: any; common?: any }) {
  const product = products[0]
  const { price, originalPrice, symbol } = useCurrency()
  const addItem = useCartStore((state) => state.addItem)
  const openModal = useModalStore((state) => state.openModal)

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)
  const benefits: string[] = dict?.benefits || product.features

  const handleAddToCart = () => {
    addItem(product, 1)
    openModal()
  }

  return (
    <section className="bg-white pb-16 pt-10 md:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product visual */}
          <div className="relative">
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-red-50/60 p-10 shadow-sm md:min-h-[420px]">
              <Image
                src="/logo-icon.webp"
                alt={product.name}
                width={320}
                height={320}
                className="h-auto w-full max-w-[260px] rounded-2xl shadow-lg"
                priority
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="absolute -bottom-5 right-4 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-primary-dark"
            >
              <Download className="h-4 w-4" />
              {dict?.instantAccess || "Instant Access"}
            </button>
          </div>

          {/* Sales copy */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {dict?.rating || "Rated 5/5 by verified customers"}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                {dict?.titleStart || "LightBurn Pro"}{" "}
                <span className="text-primary">{dict?.titleHighlight || "laser cutting"}</span>{" "}
                {dict?.titleEnd || "software"}
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                {dict?.subtitle ||
                  "Layout, editing and control software for your laser cutter. One-time payment, instant delivery, no subscription."}
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-2.5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3 pt-2">
              <span className="text-4xl font-bold text-gray-900 md:text-5xl">
                {symbol}
                {price.toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                {symbol}
                {originalPrice.toFixed(2)}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                {(dict?.save || "Save {discount}%").replace("{discount}", String(discount))}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl"
            >
              <Zap className="h-5 w-5" />
              {dict?.cta || "Get instant access now"}
            </button>

            <div className="border-t border-gray-100 pt-5">
              <PaymentMarks label={dict?.secureCheckout} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
