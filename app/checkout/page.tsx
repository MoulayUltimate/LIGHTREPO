"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShieldCheck, Lock, CreditCard, Mail, User } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe (Replace with your actual publishable key)
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const clearCart = useCartStore((state) => state.clearCart)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        // Simulate payment processing for demo purposes
        // In a real app, you would confirm the payment intent here
        setTimeout(() => {
            setIsLoading(false)
            setMessage("Payment successful! (Demo Mode)")
            clearCart()
            // Redirect to success page or show success message
        }, 2000)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    Contact Information
                </h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="you@example.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Your product license will be sent to this email.
                        </p>
                    </div>
                </div>
            </div>

            {/* Personal Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    Personal Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="Doe"
                        />
                    </div>
                </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    Payment Method
                </h2>

                {/* Stripe Element Placeholder - In a real integration, use <PaymentElement /> */}
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center text-gray-500 text-sm">
                    Stripe Payment Element would load here.
                    <br />
                    (Requires valid Client Secret from backend)
                </div>


            </div>

            <button
                type="submit"
                disabled={isLoading || !stripe}
                className="w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-800 hover:to-red-900 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <span>Processing...</span>
                ) : (
                    <>
                        <Lock className="h-5 w-5" />
                        Pay Securely
                    </>
                )}
            </button>

            {message && (
                <div className="p-4 rounded-lg bg-green-50 text-green-700 text-center font-medium">
                    {message}
                </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="h-3 w-3 text-green-600" />
                Guaranteed Safe & Secure Checkout
            </div>
        </form>
    )
}

export default function CheckoutPage() {
    const items = useCartStore((state) => state.items)
    const getTotalPrice = useCartStore((state) => state.getTotalPrice)
    const [mounted, setMounted] = useState(false)
    const [couponCode, setCouponCode] = useState("")
    const [discount, setDiscount] = useState(0)
    const [couponError, setCouponError] = useState("")
    const [isCouponApplied, setIsCouponApplied] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const totalPrice = getTotalPrice()

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === "LIGHT10") {
            const discountAmount = totalPrice * 0.10
            setDiscount(discountAmount)
            setIsCouponApplied(true)
            setCouponError("")
        } else {
            setCouponError("Invalid coupon code")
            setDiscount(0)
            setIsCouponApplied(false)
        }
    }

    const finalPrice = totalPrice - discount

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Store
                    </Link>
                    <div className="flex items-center gap-3">
                        <Image src="/logo-icon.webp" alt="LightBurn" width={40} height={40} className="rounded-lg" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Checkout</h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Items List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {items.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                                ) : (
                                    items.map((item) => (
                                        <div key={item.product.id} className="flex gap-3">
                                            <div className="relative h-16 w-16 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                                                <Image
                                                    src="/logo-icon.webp"
                                                    alt="LightBurn"
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">
                                                    {item.product.name}
                                                </h3>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                                    <span className="font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Coupon Code */}
                            <div className="mb-6 pt-4 border-t border-gray-100">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Coupon code"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        disabled={isCouponApplied}
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={!couponCode || isCouponApplied}
                                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isCouponApplied ? "Applied" : "Apply"}
                                    </button>
                                </div>
                                {couponError && (
                                    <p className="text-red-500 text-xs mt-1">{couponError}</p>
                                )}
                                {isCouponApplied && (
                                    <p className="text-green-600 text-xs mt-1">Coupon applied successfully!</p>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                {isCouponApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount (10%)</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>${finalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100">
                                <div className="flex flex-col items-center text-center gap-1">
                                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 leading-tight">Secure Payment</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 leading-tight">SSL Encrypted</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 leading-tight">Buyer Protection</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
