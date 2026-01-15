'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

    if (items.length === 0) {
        return (
            <Section background="gray">
                <div className="text-center py-16 max-w-md mx-auto">
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gray-200">
                        <ShoppingBag className="h-10 w-10 text-gray-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-gray-600 mb-8">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link href="/">
                        <Button variant="primary" size="lg">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            </Section>
        );
    }

    return (
        <Section background="gray">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="card p-6">
                            <div className="flex gap-6">
                                {/* Product Image */}
                                <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-gray-900">
                                                    €{item.price.toFixed(2)}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        €{item.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-600">Quantity:</span>
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-100 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-6 py-2 font-semibold min-w-[60px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-100 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-24">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 pb-6 border-b">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold">€{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-semibold text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Tax</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span>€{totalPrice.toFixed(2)}</span>
                        </div>

                        <Button variant="primary" size="lg" className="w-full mb-4">
                            <Link href="/checkout" className="w-full">
                                Proceed to Checkout
                            </Link>
                        </Button>

                        <Link href="/" className="block text-center">
                            <Button variant="outline" size="md" className="w-full">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
}
