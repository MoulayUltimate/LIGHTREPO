"use client"

import Image from "next/image"
import { products } from "@/lib/products"
import { useModalStore } from "@/lib/modal-store"
import { useCurrency } from "@/components/currency-provider"

export function ProductShowcase() {
  const openModal = useModalStore((state) => state.openModal)
  const product = products[0]
  const { price, originalPrice, symbol } = useCurrency()

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24 border-b border-gray-200">
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
                  {originalPrice.toFixed(2)}
                  {symbol}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  {price.toFixed(2)}
                  {symbol}
                </span>
              </div>

              {/* Stock Status */}
              <p className="text-green-600 font-medium mb-8">In stock - Instant Delivery</p>

              {/* View Details Button */}
              <button
                onClick={openModal}
                className="w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-800 hover:to-red-900 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
              >
                View Details & Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
