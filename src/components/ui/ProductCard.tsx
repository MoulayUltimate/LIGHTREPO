'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, ShoppingCart, Package, Zap } from 'lucide-react';
import { Product } from '@/types';
import { Button } from './Button';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
    product: Product;
    featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    if (featured) {
        // Featured product layout (inspired by cadlink.store)
        return (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left - Product Image */}
                    <div className="relative bg-gradient-to-br from-gray-50 to-white p-12 flex items-center justify-center">
                        <div className="absolute top-6 left-6">
                            <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="ml-2 text-sm font-bold text-gray-900">4.9/5</span>
                            </div>
                        </div>

                        <div className="relative w-full max-w-md aspect-square">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                                Official License
                            </span>
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                In Stock & Ready
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Price Section */}
                        <div className="mb-8">
                            <div className="text-sm text-gray-600 mb-2 font-medium">Special Offer Price</div>
                            <div className="flex items-baseline gap-4">
                                <div className="text-5xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </div>
                                <div className="text-2xl text-gray-400 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </div>
                                <span className="bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                                    SAVE {discountPercent}%
                                </span>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-5 py-3 hover:bg-gray-50 transition-colors font-bold text-gray-700"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center font-bold text-gray-900 border-x-2 border-gray-200 py-3"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-5 py-3 hover:bg-gray-50 transition-colors font-bold text-gray-700"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/40 flex items-center justify-center gap-3 text-lg"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-gray-700">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <span className="text-sm font-medium">INSTANT KEY DELIVERY</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <span className="text-sm font-medium">LIFETIME ACTIVATION</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Regular product card (grid view)
    return (
        <div className="card card-hover overflow-hidden group">
            {/* Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice > product.price && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        -{discountPercent}%
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm font-medium text-gray-700">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                {/* Action */}
                <Link href={`/product/${product.slug}`} className="block">
                    <Button variant="outline" size="md" className="w-full">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}
