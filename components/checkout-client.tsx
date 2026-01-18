"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShieldCheck, Lock, CreditCard, Mail, User, Loader2 } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useCurrency } from "@/components/currency-provider"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function PaymentForm({
    amount,
    clientSecret,
    dict,
    email,
    name,
    items,
    currencyPrice
}: {
    amount: number,
    clientSecret: string,
    dict: any,
    email: string,
    name: string,
    items: any[],
    currencyPrice: number
}) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        // Create order with customer details
        try {
            await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentIntentId: clientSecret.split("_secret")[0], // Extract PI ID from client secret
                    email: email,
                    name: name,
                    amount: amount,
                    items: items.map(item => ({ ...item, product: { ...item.product, price: currencyPrice } }))
                }),
            })
        } catch (err) {
            console.error("Failed to create order", err)
            // Continue with payment anyway
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
                payment_method_data: {
                    billing_details: {
                        email: email,
                        // We let Stripe collect the name and address (country) via the Payment Element
                        // This ensures "Cardholder Name" matches exactly what the bank expects
                    },
                },
            },
        })

        if (error) {
            setMessage(error.message || "An unexpected error occurred.")
            setIsLoading(false)
        } else {
            // Your customer will be redirected to your `return_url`.
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    {dict?.payment?.title || "Payment Method"}
                </h2>

                <PaymentElement options={{
                    fields: {
                        billingDetails: {
                            name: 'auto', // Explicitly ask for Cardholder Name
                            email: 'never', // We already collected email
                        }
                    }
                }} />
            </div>

            <button
                type="submit"
                disabled={isLoading || !stripe || !elements}
                className="w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-800 hover:to-red-900 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <span>{dict?.payment?.processing || "Processing..."}</span>
                ) : (
                    <>
                        <Lock className="h-5 w-5" />
                        {dict?.payment?.paySecurely || "Pay Securely"}
                    </>
                )}
            </button>

            {message && (
                <div className="p-4 rounded-lg bg-red-50 text-red-700 text-center font-medium">
                    {message}
                </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="h-3 w-3 text-green-600" />
                {dict?.payment?.guarantee || "Guaranteed Safe & Secure Checkout"}
            </div>
        </form>
    )
}

export function CheckoutClient({ dict }: { dict: any }) {
    const items = useCartStore((state) => state.items)
    const { price: currencyPrice, symbol, currency } = useCurrency()
    const [mounted, setMounted] = useState(false)
    const [couponCode, setCouponCode] = useState("")
    const [discount, setDiscount] = useState(0)
    const [couponError, setCouponError] = useState("")
    const [isCouponApplied, setIsCouponApplied] = useState(false)
    const [clientSecret, setClientSecret] = useState("")

    // Form State
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isInitializingPayment, setIsInitializingPayment] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const totalPrice = items.reduce((acc, item) => acc + item.quantity, 0) * currencyPrice
    const finalPrice = totalPrice - discount

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

    const handleContinueToPayment = async () => {
        if (!email || !firstName || !lastName) {
            setError("Please fill in all fields")
            return
        }
        if (!email.includes("@")) {
            setError("Please enter a valid email address")
            return
        }

        // Track Begin Checkout Conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-17873403949/qIXACPWe5OYbEK2A2spC',
                'value': finalPrice,
                'currency': currency.toUpperCase()
            });
        }

        setIsInitializingPayment(true)
        setError(null)

        try {
            const res = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: finalPrice,
                    currency: currency.toLowerCase(),
                    items: items.map(item => ({
                        id: item.product.id,
                        name: item.product.name,
                        quantity: item.quantity,
                        price: currencyPrice
                    }))
                }),
            })

            if (!res.ok) {
                throw new Error("Failed to initialize payment")
            }

            const data = await res.json()
            setClientSecret(data.clientSecret)

            // Capture abandoned order immediately after creating intent
            await fetch("/api/orders/abandoned", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentIntentId: data.clientSecret.split("_secret")[0],
                    email: email,
                    amount: finalPrice,
                    items: items.map(item => ({ ...item, product: { ...item.product, price: currencyPrice } })),
                    name: `${firstName} ${lastName}`.trim()
                }),
            }).catch(err => console.error("Failed to capture abandoned order", err))

        } catch (err) {
            console.error("Error fetching payment intent:", err)
            setError("Failed to load payment system. Please try again.")
        } finally {
            setIsInitializingPayment(false)
        }
    }

    if (!mounted) return null

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

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
                        {dict?.backToStore || "Back to Store"}
                    </Link>
                    <div className="flex items-center gap-3">
                        <Image src="/logo-icon.webp" alt="LightBurn" width={40} height={40} className="rounded-lg" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{dict?.title || "Checkout"}</h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
                        {items.length === 0 ? (
                            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                                <p className="text-gray-500 mb-4">{dict?.empty || "Your cart is empty."}</p>
                                <Link href="/" className="text-primary hover:underline font-medium">
                                    {dict?.continueShopping || "Continue Shopping"}
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Contact Information */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                        {dict?.contact?.title || "Contact Information"}
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                {dict?.contact?.email || "Email Address"}
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={!!clientSecret}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                placeholder="you@example.com"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {dict?.contact?.note || "Your product license will be sent to this email."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Details */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <User className="h-5 w-5 text-gray-500" />
                                        {dict?.personal?.title || "Personal Details"}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                                {dict?.personal?.firstName || "First Name"}
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                required
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                disabled={!!clientSecret}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                                {dict?.personal?.lastName || "Last Name"}
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                required
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled={!!clientSecret}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-lg bg-red-50 text-red-700 font-medium">
                                        {error}
                                    </div>
                                )}

                                {!clientSecret ? (
                                    <button
                                        onClick={handleContinueToPayment}
                                        disabled={isInitializingPayment}
                                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isInitializingPayment ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>{dict?.payment?.processing || "Processing..."}</span>
                                            </>
                                        ) : (
                                            <span>Continue to Payment</span>
                                        )}
                                    </button>
                                ) : (
                                    <Elements options={options as any} stripe={stripePromise}>
                                        <PaymentForm
                                            amount={finalPrice}
                                            clientSecret={clientSecret}
                                            dict={dict}
                                            email={email}
                                            name={`${firstName} ${lastName}`}
                                            items={items}
                                            currencyPrice={currencyPrice}
                                        />
                                    </Elements>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">{dict?.summary?.title || "Order Summary"}</h2>

                            {/* Items List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {items.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">{dict?.empty || "Your cart is empty"}</p>
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
                                                    <span className="font-bold text-gray-900">{symbol}{(currencyPrice * item.quantity).toFixed(2)}</span>
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
                                        placeholder={dict?.coupon?.placeholder || "Coupon code"}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        disabled={isCouponApplied || !!clientSecret}
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={!couponCode || isCouponApplied || !!clientSecret}
                                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isCouponApplied ? (dict?.coupon?.applied || "Applied") : (dict?.coupon?.apply || "Apply")}
                                    </button>
                                </div>
                                {couponError && (
                                    <p className="text-red-500 text-xs mt-1">{couponError}</p>
                                )}
                                {isCouponApplied && (
                                    <p className="text-green-600 text-xs mt-1">{dict?.coupon?.success || "Coupon applied successfully!"}</p>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>{dict?.summary?.subtotal || "Subtotal"}</span>
                                    <span>{symbol}{totalPrice.toFixed(2)}</span>
                                </div>
                                {isCouponApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>{dict?.summary?.discount || "Discount"} (10%)</span>
                                        <span>-{symbol}{discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>{dict?.summary?.shipping || "Shipping"}</span>
                                    <span className="text-green-600 font-medium">{dict?.summary?.free || "Free"}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100">
                                    <span>{dict?.summary?.total || "Total"}</span>
                                    <span>{symbol}{finalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100">
                                <div className="flex flex-col items-center text-center gap-1">
                                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 leading-tight">{dict?.trust?.secure || "Secure Payment"}</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 leading-tight">{dict?.trust?.ssl || "SSL Encrypted"}</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 leading-tight">{dict?.trust?.protection || "Buyer Protection"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
