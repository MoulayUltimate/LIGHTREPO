"use client"

import Link from "next/link"
import Image from "next/image"
import { ProductButton } from "@/components/ui/product-button"
import { products } from "@/lib/products"
import { useModalStore } from "@/lib/modal-store"
import { useCurrency } from "@/components/currency-provider"

export function HeroSection({ dict, common }: { dict?: any, common?: any }) {
  const product = products[0]
  const openModal = useModalStore((state) => state.openModal)
  const { price, symbol } = useCurrency()

  const handlePurchase = async () => {
    try {
      await fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkUrl: "https://t.co/1sBBzxKg9O",
          location: "hero"
        }),
      });
    } catch (err) {
      console.error("Tracking failed", err);
    } finally {
      window.location.href = "https://t.co/1sBBzxKg9O";
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-gray-200">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative order-1 lg:order-1">
            <div className="relative flex justify-center">
              <Image
                src="/lightburn-software-screenshot.webp"
                alt="LightBurn Pro Software Interface"
                width={600}
                height={450}
                className="rounded-2xl shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 order-2 lg:order-2">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {dict?.title || "LightBurn is layout, editing, and control software for your laser cutter."}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {dict?.subtitle || "LightBurn is a native application written for Windows Only."}
              </p>
              <p className="text-lg font-semibold text-primary">
                {dict?.oneTimePayment || "One-time payment – No subscription required."}
              </p>
            </div>

            {/* Promo Code */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold">
              {common?.useCode || "USE LIGHT10 FOR 10% OFF!"}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-5xl md:text-6xl font-bold text-gray-900">
                {symbol}{price.toFixed(2)}
              </span>
            </div>

            {/* CTA */}
            <ProductButton size="lg" variant="primary" className="px-8" onClick={handlePurchase}>
              {dict?.buyNow || "Buy Now"}
            </ProductButton>
          </div>
        </div>
      </div>
    </section>
  )
}
