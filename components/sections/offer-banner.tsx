"use client"

import { Clock } from "lucide-react"
import { useCurrency } from "@/components/currency-provider"

export function OfferBanner({ dict }: { dict?: any }) {
  const { price, originalPrice, symbol } = useCurrency()
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  const template =
    dict?.offer || "Save {discount}% today — only {price} (regular {original})"
  const text = template
    .replace("{discount}", String(discount))
    .replace("{price}", `${symbol}${price.toFixed(2)}`)
    .replace("{original}", `${symbol}${originalPrice.toFixed(2)}`)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-4 text-center text-white">
        <Clock className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-semibold sm:text-base">{text}</p>
      </div>
    </div>
  )
}
