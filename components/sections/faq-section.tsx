"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How long does my license last?",
    answer:
      "LightBurn will work forever as long as you have your license key, but after a year you will need to renew the maintenance on your license to keep getting the latest features and updates.",
  },
  {
    question: "What operating systems does your software work with?",
    answer: "Windows 10+",
  },
  {
    question: "Is LightBurn Compatible with My Laser Machine?",
    answer:
      "LightBurn supports: Ruida (CO2), GRBL (Diode and CO2 lasers), Smoothieboard, TopWisdom, EZCad2 & EZCad2-Lite (Galvo fiber, CO2, and UV). Not sure about compatibility? Download the free trial and test it directly with your machine.",
  },
  {
    question: "Does LightBurn Work on Windows, Mac, and Linux?",
    answer:
      "Yes! LightBurn is compatible with Windows only, allowing you to use it on your preferred operating system. Try it risk-free – Download the 30-day free trial and see how it works on your device!",
  },
  {
    question: "Is LightBurn a Subscription or a One-Time Purchase?",
    answer:
      "LightBurn is a One-Time Purchase – No Monthly Subscription! When you buy LightBurn, you get lifetime access with 12 months of free updates included.",
  },
  {
    question: "What Happens After 12 Months? Do I Need to Pay Again?",
    answer:
      "No, you do not need to pay again. After 12 months, you can continue using LightBurn indefinitely with the last version you received. If you want to receive new updates after the first year, you can renew your license at any time, but this is completely optional.",
  },
  {
    question: "Can my whole team use the software?",
    answer:
      "Yes, even commercial businesses can use the same Activation across their entire team without additional costs.",
  },
  {
    question: "How do I buy the software?",
    answer:
      "It's easy! Just add it to your cart, fill in your details, and you'll get your Download Link right after completing your purchase.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-bg" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FAQ For <span className="text-primary">LightBurn</span> Pro
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                    openIndex === index ? "rotate-180 text-primary" : "text-gray-400",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0",
                )}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
