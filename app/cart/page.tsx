"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, ShieldCheck, Lock, CreditCard } from "lucide-react"
import { ProductButton } from "@/components/ui/product-button"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)
  const openModal = useModalStore((state) => state.openModal)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-bg min-h-screen py-8 md:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
            <div className="bg-white rounded-2xl p-8 h-64" />
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-bg min-h-screen py-8 md:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="h-20 w-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven{"'"}t added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/">
              <ProductButton variant="primary" size="lg">
                Continue Shopping
              </ProductButton>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const totalPrice = getTotalPrice()
  const originalTotal = items.reduce((total, item) => total + item.product.originalPrice * item.quantity, 0)
  const savings = originalTotal - totalPrice

  return (
    <div className="bg-bg min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <button onClick={clearCart} className="text-sm text-gray-500 hover:text-primary transition-colors">
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative h-24 w-24 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={openModal}
                      className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 text-left"
                    >
                      {item.product.name}
                    </button>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-lg text-gray-900">${item.product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-400 line-through">
                        ${item.product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${originalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>You Save</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <ProductButton variant="secondary" size="lg" className="w-full mb-4">
                Proceed to Checkout
              </ProductButton>

              {/* Trust Badges */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Official Licensed Product
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Secure SSL Checkout
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4 text-purple-600" />
                  Multiple Payment Options
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
