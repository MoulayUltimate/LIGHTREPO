"use client"
export const runtime = 'edge'

import Link from "next/link"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"

function SuccessContent() {
    const searchParams = useSearchParams()
    const paymentIntentId = searchParams.get("payment_intent")
    const { clearCart } = useCartStore()
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

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
            .then((res) => {
                if (res.ok) {
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming Order...</h1>
                <p className="text-gray-600">Please wait while we verify your payment.</p>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
                <p className="text-gray-600 mb-8">
                    We couldn't confirm your payment automatically. If you were charged, please contact support.
                </p>
                <Link href="/contact">
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-lg rounded-xl font-medium transition-colors">
                        Contact Support
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div className="text-center">
            <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-8">
                Your order has been placed successfully. You will receive an email confirmation shortly.
            </p>

            <div className="space-y-4">
                <Link href="/">
                    <button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg rounded-xl font-medium transition-colors">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
                <Suspense fallback={
                    <div className="text-center">
                        <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
                        <p>Loading...</p>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </div>
        </div>
    )
}
