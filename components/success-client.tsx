"use client"

import Link from "next/link"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import Script from "next/script"

function SuccessContent({ dict }: { dict: any }) {
    const searchParams = useSearchParams()
    const paymentIntentId = searchParams.get("payment_intent")
    const { clearCart } = useCartStore()
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [orderDetails, setOrderDetails] = useState<{ amount: number, currency: string } | null>(null)

    useEffect(() => {
        if (!paymentIntentId) {
            setStatus("error")
            return
        }

        // Confirm payment and update order
        fetch("/api/orders/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIntentId }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setOrderDetails({
                        amount: data.amount,
                        currency: data.currency
                    })
                    setStatus("success")
                    clearCart()
                } else {
                    setStatus("error")
                }
            })
            .catch((err) => {
                console.error("Confirmation error:", err)
                setStatus("error")
            })
    }, [paymentIntentId, clearCart])

    if (status === "loading") {
        return (
            <div className="text-center">
                <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{dict?.loading?.title || "Confirming Order..."}</h1>
                <p className="text-gray-600">{dict?.loading?.message || "Please wait while we verify your payment."}</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{dict?.error?.title || "Something went wrong"}</h1>
                <p className="text-gray-600 mb-8">
                    {dict?.error?.message || "We couldn't confirm your payment automatically. If you were charged, please contact support."}
                </p>
                <Link href="/contact">
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-lg rounded-xl font-medium transition-colors">
                        {dict?.error?.contact || "Contact Support"}
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div className="text-center">
            {orderDetails && (
                <Script id="google-ads-conversion" strategy="afterInteractive">
                    {`
                        gtag('event', 'conversion', {
                            'send_to': 'AW-17873403949/qWP_COO15OYbEK2A2spC',
                            'value': ${orderDetails.amount},
                            'currency': '${orderDetails.currency}',
                            'transaction_id': '${paymentIntentId}'
                        });
                    `}
                </Script>
            )}
            <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{dict?.success?.title || "Thank You!"}</h1>
            <p className="text-gray-600 mb-8">
                {dict?.success?.message || "Your order has been placed successfully. You will receive an email confirmation shortly."}
            </p>

            <div className="space-y-4">
                <Link href="/">
                    <button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg rounded-xl font-medium transition-colors">
                        {dict?.success?.continue || "Continue Shopping"}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export function SuccessClient({ dict }: { dict: any }) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
                <Suspense fallback={
                    <div className="text-center">
                        <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
                        <p>{dict?.loading?.title || "Loading..."}</p>
                    </div>
                }>
                    <SuccessContent dict={dict} />
                </Suspense>
            </div>
        </div>
    )
}
