"use client"

import Link from "next/link"
import Image from "next/image"
import { Check, ShoppingCart } from "lucide-react"
import { ProductButton } from "@/components/ui/product-button"
import { useModalStore } from "@/lib/modal-store"
import { useCartStore } from "@/lib/cart-store"
import { products } from "@/lib/products"

const benefits = [
  "The Best Laser Engraving Software – Trusted by thousands of users worldwide",
  "Work For All Countries",
  "Quick and Easy Installation – Get started in minutes",
  "30-Day Free Trial – Try it before you buy",
  "Secure Payment – Pay with PayPal, credit card, and more",
  "100% Satisfaction Guarantee or Your Money Back – Buy with confidence",
]

export function WhyChooseSection({ dict }: { dict?: any }) {
  const openModal = useModalStore((state) => state.openModal)
  const addItem = useCartStore((state) => state.addItem)
  const product = products[0]
  const benefits = dict?.benefits || [
    "The Best Laser Engraving Software – Trusted by thousands of users worldwide",
    "Work For All Countries",
    "Quick and Easy Installation – Get started in minutes",
    "30-Day Free Trial – Try it before you buy",
    "Secure Payment – Pay with PayPal, credit card, and more",
    "100% Satisfaction Guarantee or Your Money Back – Buy with confidence",
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <Image
              src="/lightburn-software-screenshot.webp"
              alt="LightBurn Pro Software"
              width={600}
              height={450}
              className="rounded-2xl shadow-xl"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {dict?.title || "Why Choose"} <span className="text-primary">{dict?.highlight || "LightBurn"}</span>?
            </h2>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit: string) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <p className="text-xl font-semibold text-gray-900 mb-6">{dict?.ready || "Ready to take control of your laser?"}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  addItem(product, 1)
                  openModal()
                }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-red-700 hover:from-red-800 hover:to-red-900 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <ShoppingCart className="h-5 w-5" />
                {dict?.cta || "Add to Cart"}
              </button>
              <a
                href="https://t.co/dpqQleL9l2"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                {dict?.viewMore || "View Details"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
