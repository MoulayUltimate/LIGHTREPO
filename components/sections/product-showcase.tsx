"use client"

import Image from "next/image"
import { useCartStore } from "@/lib/cart-store"
import { products, CURRENCY_SYMBOL } from "@/lib/products"

export function ProductShowcase() {
  const addItem = useCartStore((state) => state.addItem)
  const product = products[0]

  const handleBuyNow = () => {
    addItem(product, 1)
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#f5f5f5]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Logo Stack */}
          <div className="flex flex-col items-center">
            {/* Dragon Icon */}
            <div className="mb-8">
              <Image src="/logo-icon.webp" alt="LightBurn" width={280} height={280} className="rounded-2xl shadow-lg" />
            </div>

            {/* Wordmark with Tagline */}
            <div className="flex flex-col items-center">
              <Image src="/logo-wordmark.webp" alt="LightBurn" width={320} height={60} className="h-auto" />
              <p className="mt-2 text-sm tracking-[0.2em] text-gray-600 uppercase">Better Software for Laser Cutters</p>
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex flex-col">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">{product.name}</h2>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-lg text-gray-400 line-through">
                {product.originalPrice.toFixed(2)}
                {CURRENCY_SYMBOL}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                {product.price.toFixed(2)}
                {CURRENCY_SYMBOL}
              </span>
            </div>

            {/* Stock Status */}
            <p className="text-green-600 font-medium mb-8">In stock</p>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
