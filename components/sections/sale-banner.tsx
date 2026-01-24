"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useModalStore } from "@/lib/modal-store"

export function SaleBanner({ dict }: { dict?: any }) {
  const openModal = useModalStore((state) => state.openModal)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set sale end date to 7 days from now
    const saleEndDate = new Date()
    saleEndDate.setDate(saleEndDate.getDate() + 7)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = saleEndDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePurchase = async () => {
    try {
      await fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkUrl: "https://t.co/1sBBzxKg9O",
          location: "banner"
        }),
      });
    } catch (err) {
      console.error("Tracking failed", err);
    } finally {
      window.location.href = "https://t.co/1sBBzxKg9O";
    }
  }

  return (
    <section className="bg-gradient-to-r from-primary via-secondary to-primary py-8 px-4">
      <div className="mx-auto max-w-4xl text-center text-white">
        <p className="text-sm font-medium mb-2">{dict?.endsIn || "SALE ENDS IN:"}</p>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.days}</span>
            <span className="text-xs uppercase">{dict?.time?.days || "Days"}</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</span>
            <span className="text-xs uppercase">{dict?.time?.hours || "Hours"}</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</span>
            <span className="text-xs uppercase">{dict?.time?.minutes || "Minutes"}</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.seconds}</span>
            <span className="text-xs uppercase">{dict?.time?.seconds || "Seconds"}</span>
          </div>
        </div>

        <p className="text-sm font-medium mb-2">{dict?.applyCode || "APPLY THE CODE AT CHECKOUT"}</p>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {dict?.useCode || "USE LIGHT10 FOR 10% OFF"}
        </h2>

        <button
          onClick={handlePurchase}
          className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {dict?.cta || "Download now"}
        </button>
      </div>
    </section>
  )
}
