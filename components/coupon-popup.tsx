"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { X, Check, Copy, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

const COUPON_CODE = "LIGHT10"
const SHOW_AFTER_MS = 10_000
const SEEN_KEY = "lightburn-coupon-seen"

/** sessionStorage throws in some privacy modes, so every access is guarded. */
function alreadySeen(): boolean {
    try {
        return sessionStorage.getItem(SEEN_KEY) === "1"
    } catch {
        return false
    }
}

function markSeen() {
    try {
        sessionStorage.setItem(SEEN_KEY, "1")
    } catch {
        /* ignore — worst case the popup shows again next page */
    }
}

export function CouponPopup({ dict }: { dict?: any }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)
    const [copied, setCopied] = useState(false)

    // Offering a discount to someone who has just paid is the wrong moment.
    const onSuccessPage = pathname?.includes("/checkout/success") ?? false

    useEffect(() => {
        if (onSuccessPage || alreadySeen()) return
        const timer = window.setTimeout(() => setIsOpen(true), SHOW_AFTER_MS)
        return () => window.clearTimeout(timer)
    }, [onSuccessPage])

    const close = () => {
        setIsLeaving(true)
        markSeen()
        window.setTimeout(() => {
            setIsOpen(false)
            setIsLeaving(false)
        }, 200)
    }

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen])

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(COUPON_CODE)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
        } catch {
            /* clipboard blocked — the code is on screen to read */
        }
    }

    if (!isOpen) return null

    return (
        <div
            className={cn(
                "fixed inset-0 z-[120] flex items-center justify-center p-4",
                "transition-opacity duration-200",
                isLeaving ? "opacity-0" : "opacity-100",
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coupon-title"
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

            <div
                className={cn(
                    "relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl",
                    "transition-all duration-200",
                    isLeaving ? "scale-95" : "scale-100",
                )}
            >
                <button
                    onClick={close}
                    aria-label={dict?.close || "Close"}
                    className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="px-7 pb-7 pt-10 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Tag className="h-7 w-7 text-primary" />
                    </div>

                    <h2 id="coupon-title" className="mb-2 text-2xl font-bold text-gray-900">
                        {dict?.title || "Use LIGHT10 for 10% off"}
                    </h2>
                    <p className="mb-6 text-gray-600">
                        {dict?.instruction || "Use coupon during checkout"}
                    </p>

                    <button
                        onClick={copyCode}
                        className="group mb-5 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-4 transition-colors hover:bg-primary/10"
                    >
                        <span className="text-2xl font-bold tracking-[0.2em] text-primary">
                            {COUPON_CODE}
                        </span>
                        {copied ? (
                            <Check className="h-5 w-5 text-green-600" />
                        ) : (
                            <Copy className="h-5 w-5 text-primary/60 transition-colors group-hover:text-primary" />
                        )}
                    </button>

                    <p className="mb-5 h-4 text-sm text-green-600">
                        {copied ? dict?.copied || "Code copied" : ""}
                    </p>

                    <button
                        onClick={close}
                        className="w-full rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg transition-colors hover:bg-primary-dark"
                    >
                        {dict?.cta || "Continue shopping"}
                    </button>
                </div>
            </div>
        </div>
    )
}
