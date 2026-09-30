"use client"

import Image from "next/image"
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"
import { useCurrency } from "@/components/currency-provider"
import { products } from "@/lib/products"

export function SalesHeroSection({ dict, common }: { dict?: any, common?: any }) {
  const product = products[0]
  const { price, originalPrice, symbol } = useCurrency()
  const addItem = useCartStore((state) => state.addItem)
  const openModal = useModalStore((state) => state.openModal)

  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100)

  const benefits = [
    "Instant download after payment",
    "Pre-activated – No license hassle",
    "Free setup video included",
    "Lifetime access, no subscriptions",
    "24/7 Priority support",
    "30-day money-back guarantee",
  ]

  return (
    <section className="bg-white py-12 md:py-16 border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Product Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 to-red-100 p-8 flex items-center justify-center min-h-96">
              <Image
                src="/logo-icon.webp"
                alt="LightBurn Pro"
                width={300}
                height={300}
                className="w-full max-w-xs h-auto"
              />
            </div>
            
            {/* Star Rating Badge */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-700">
                  <div>4.9/5</div>
                  <div className="text-gray-500">2,847 reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Sales Copy */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                LightBurn Pro 2025
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                The professional laser cutting software that turns beginners into experts in minutes. No complex setup, no recurring fees, no frustration.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold text-gray-900">{symbol}{price.toFixed(2)}</span>
                <span className="text-lg text-gray-400 line-through">{symbol}{originalPrice.toFixed(2)}</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                  Save {discountPercent}%
                </span>
              </div>
              <p className="text-sm text-gray-600">One-time payment, lifetime access</p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                addItem(product, 1)
                openModal()
              }}
              className="w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-800 hover:to-red-900 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-3"
            >
              <Zap className="h-6 w-6" />
              GET INSTANT ACCESS NOW
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <span>256-BIT SSL ENCRYPTION</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span>Secure Checkout with:</span>
              <div className="flex gap-2">
                {/* Payment logos using text/emojis */}
                <span title="Visa">💳</span>
                <span title="Mastercard">💳</span>
                <span title="Amex">💳</span>
                <span title="PayPal">💳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
