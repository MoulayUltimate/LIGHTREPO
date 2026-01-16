"use client"

import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"
import { ProductButton } from "@/components/ui/product-button"
import { useModalStore } from "@/lib/modal-store"

const benefits = [
  "The Best Laser Engraving Software – Trusted by thousands of users worldwide",
  "Work For All Countries",
  "Quick and Easy Installation – Get started in minutes",
  "30-Day Free Trial – Try it before you buy",
  "Secure Payment – Pay with PayPal, credit card, and more",
  "100% Satisfaction Guarantee or Your Money Back – Buy with confidence",
]

export function WhyChooseSection() {
  const openModal = useModalStore((state) => state.openModal)
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
              Why Choose <span className="text-primary">LightBurn</span>?
            </h2>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <p className="text-xl font-semibold text-gray-900 mb-6">Ready to take control of your laser?</p>

            <ProductButton variant="primary" size="lg" onClick={openModal}>
              Get Started Now
            </ProductButton>
          </div>
        </div>
      </div>
    </section>
  )
}
