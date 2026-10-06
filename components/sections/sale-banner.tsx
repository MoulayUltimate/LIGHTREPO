"use client"

import { useState, useEffect } from "react"
import { useCurrency } from "@/components/currency-provider"
import { reportBeginCheckout } from "@/lib/gtag"

export function SaleBanner({ dict }: { dict?: any }) {
  const { price, currency } = useCurrency()
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    // The deadline comes from configuration. The previous version recomputed
    // "now + 7 days" on every mount, so it always read about six days left no
    // matter when you visited — a deadline that never arrived. With no date
    // configured we show no timer rather than an invented one.
    const configured = process.env.NEXT_PUBLIC_SALE_ENDS_AT
    if (!configured) return

    const saleEndDate = new Date(configured)
    if (Number.isNaN(saleEndDate.getTime())) {
      console.warn("NEXT_PUBLIC_SALE_ENDS_AT is not a valid date:", configured)
      return
    }

    const tick = () => {
      const distance = saleEndDate.getTime() - Date.now()
      if (distance <= 0) {
        setTimeLeft(null)
        return
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-gradient-to-r from-primary via-secondary to-primary py-8 px-4">
      <div className="mx-auto max-w-4xl text-center text-white">
        {timeLeft && (
          <>
        <p className="text-sm font-medium mb-2">{dict?.endsIn || "SALE ENDS IN:"}</p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft?.days}</span>
            <span className="text-xs uppercase">{dict?.time?.days || "Days"}</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft?.hours}</span>
            <span className="text-xs uppercase">{dict?.time?.hours || "Hours"}</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft?.minutes}</span>
            <span className="text-xs uppercase">{dict?.time?.minutes || "Minutes"}</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft?.seconds}</span>
            <span className="text-xs uppercase">{dict?.time?.seconds || "Seconds"}</span>
          </div>
        </div>
          </>
        )}

        <p className="text-sm font-medium mb-2">{dict?.applyCode || "APPLY THE CODE AT CHECKOUT"}</p>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {dict?.useCode || "USE LIGHT10 FOR 10% OFF"}
        </h2>

        <a
          href="https://t.co/g3tl0F9IWS"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault()
            reportBeginCheckout({
              url: "https://t.co/g3tl0F9IWS",
              value: price,
              currency,
                                location: "sale-banner",
            })
          }}
          className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {dict?.cta || "Download now"}
        </a>
      </div>
    </section>
  )
}
