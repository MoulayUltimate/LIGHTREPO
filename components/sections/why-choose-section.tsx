"use client"

import { Check, ShoppingCart } from "lucide-react"
import { useModalStore } from "@/lib/modal-store"
import { useCartStore } from "@/lib/cart-store"
import { products } from "@/lib/products"
import { reportAddToCart } from "@/lib/gtag"

export function WhyChooseSection({ dict }: { dict?: any }) {
  const openModal = useModalStore((state) => state.openModal)
  const addItem = useCartStore((state) => state.addItem)
  const product = products[0]
  const benefits = dict?.benefits || [
    "The Best Laser Engraving Software – Trusted by thousands of users worldwide",
    "Work For All Countries",
    "Quick and Easy Installation – Get started in minutes",
    "30-Day Free Trial – Try it before you buy",
    "Secure Payment – Pay with credit card and more",
    "100% Satisfaction Guarantee or Your Money Back – Buy with confidence",
  ]

  return (
    <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {dict?.title || "Why Choose"}{" "}
            <span className="text-primary">{dict?.highlight || "LightBurn"}</span>?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit: string) => (
            <div
              key={benefit}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </span>
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-xl font-semibold text-gray-900">
            {dict?.ready || "Ready to take control of your laser?"}
          </p>
          <button
            onClick={() => {
              addItem(product)
                    reportAddToCart("why-choose")
              openModal()
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl"
          >
            <ShoppingCart className="h-5 w-5" />
            {dict?.cta || "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  )
}
