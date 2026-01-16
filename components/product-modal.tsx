"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ShoppingBag, Lock, ShieldCheck } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"
import { cn } from "@/lib/utils"
import { products } from "@/lib/products"
import { useCurrency } from "@/components/currency-provider"

export function ProductModal() {
    const { isOpen, closeModal } = useModalStore()
    const items = useCartStore((state) => state.items)
    const addItem = useCartStore((state) => state.addItem)
    const { price: currencyPrice, symbol } = useCurrency()
    const [isClosing, setIsClosing] = useState(false)

    // Auto-add default product if cart is empty when opening
    useEffect(() => {
        if (isOpen && items.length === 0) {
            addItem(products[0], 1)
        }
    }, [isOpen, items.length, addItem])

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false)
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(closeModal, 300)
    }

    if (!isOpen && !isClosing) return null

    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)
    const displayTotal = currencyPrice * totalQuantity

    return (
        <div className={cn(
            "fixed inset-0 z-[100] flex justify-end", // Right alignment
            "transition-all duration-300 ease-in-out",
            isOpen && !isClosing ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Drawer Content */}
            <div
                className={cn(
                    "relative w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col h-full",
                    "transform transition-all duration-300 ease-out",
                    isOpen && !isClosing ? "translate-x-0" : "translate-x-full" // Slide from right
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                            {items.length} items
                        </span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Your cart is empty
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.product.id} className="flex gap-4">
                                <div className="relative h-20 w-20 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                                    <Image
                                        src="/logo-icon.webp"
                                        alt="LightBurn"
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm mb-1">
                                        {item.product.name}
                                    </h3>
                                    <div className="text-primary font-bold">
                                        {symbol}{currencyPrice.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Qty: {item.quantity}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 space-y-4 border-t border-gray-200">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium">{symbol}{displayTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="font-medium text-green-600">Free</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                        <span>Total</span>
                        <span>{symbol}{displayTotal.toFixed(2)}</span>
                    </div>

                    <Link href="/checkout" className="block w-full" onClick={closeModal}>
                        <button className="w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-800 hover:to-red-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            <Lock className="h-5 w-5" />
                            Secure Checkout
                        </button>
                    </Link>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <ShieldCheck className="h-3 w-3" />
                        Guaranteed Safe & Secure Checkout
                    </div>
                </div>
            </div>
        </div>
    )
}
