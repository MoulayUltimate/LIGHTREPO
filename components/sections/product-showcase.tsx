"use client"

import Image from "next/image"
import { products } from "@/lib/products"
import { useCurrency } from "@/components/currency-provider"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"
import { ShoppingCart, ExternalLink } from "lucide-react"

export function ProductShowcase({ dict, common }: { dict?: any, common?: any }) {
  const product = products[0]
  const { price, originalPrice, symbol } = useCurrency()
  const addItem = useCartStore((state) => state.addItem)
  const openModal = useModalStore((state) => state.openModal)

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24 border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Logo Stack */}
            <div className="flex flex-col items-center">
              {/* Dragon Icon */}
              <div className="mb-8">
                <Image src="/logo-icon.webp" alt="LightBurn" width={280} height={280} className="h-auto" />
              </div>

              {/* Wordmark — the asset already carries the tagline */}
              <Image src="/logo-wordmark.webp" alt="LightBurn" width={320} height={60} className="h-auto" />
            </div>

            {/* Right - Product Details */}
            <div className="flex flex-col">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">{product.name}</h2>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-lg text-gray-400 line-through">
                  {symbol}{originalPrice.toFixed(2)}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  {symbol}{price.toFixed(2)}
                </span>
              </div>

              {/* Stock Status */}
              <p className="text-green-600 font-medium mb-8">{dict?.inStock || "In stock - Instant Delivery"}</p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    addItem(product, 1)
                    openModal()
                  }}
                  className="flex w-full flex-1 basis-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-red-700 px-4 py-4 text-center text-sm font-bold leading-tight text-white shadow-lg transition-all duration-300 hover:from-red-800 hover:to-red-900 hover:shadow-xl lg:px-6 lg:text-base"
                >
                  <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                  <span className="text-balance">{dict?.cta || "Add to Cart"}</span>
                </button>
                <a
                  href="https://t.co/g3tl0F9IWS"
                  rel="noopener noreferrer"
                  className="flex w-full flex-1 basis-0 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-4 text-center text-sm font-bold leading-tight text-gray-900 transition-all duration-300 hover:bg-gray-200 lg:px-6 lg:text-base"
                >
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  <span className="text-balance">{dict?.viewMore || "View Secure Checkout"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
