import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react"
import { useCartStore } from "@/lib/cart-store"

export default function SuccessPage() {
    const { clearCart } = useCartStore()

    useEffect(() => {
        clearCart()
    }, [clearCart])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
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
        </div>
    )
}
