"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Check,
  Star,
  ShieldCheck,
  Package,
  Minus,
  Plus,
  Clock,
  Headphones,
  ArrowLeft,
  Download,
  RefreshCw,
} from "lucide-react"
import { ProductButton } from "@/components/ui/product-button"
import { useCartStore } from "@/lib/cart-store"
import { getProductBySlug, getDiscountPercentage } from "@/lib/products"

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)

  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    notFound()
  }

  const discount = getDiscountPercentage(product)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, quantity)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div className="bg-bg min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-900">4.9</span>
                <span className="text-sm text-gray-500">(2,847 reviews)</span>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-6 right-6 bg-primary text-white px-4 py-2 rounded-full font-bold">
                -{discount}% OFF
              </div>
            </div>

            {/* Right - Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  Official License
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  <Package className="h-4 w-4" />
                  {product.inStock ? "In Stock & Ready" : "Out of Stock"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Pricing */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">SAVE {discount}%</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <ProductButton
                variant="secondary"
                size="lg"
                className="w-full mb-6"
                onClick={handleAddToCart}
                isLoading={isAdding}
                disabled={!product.inStock}
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </ProductButton>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Check className="h-4 w-4" />
                  INSTANT KEY DELIVERY
                </div>
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Check className="h-4 w-4" />
                  LIFETIME ACTIVATION
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="h-5 w-5 text-primary" />
                  Delivered within 1-30 minutes
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Headphones className="h-5 w-5 text-primary" />
                  24/7 customer support
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Features List */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              What You Get
            </h2>
            <ul className="space-y-4">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compatibility */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Compatible Controllers
            </h2>
            <ul className="space-y-4">
              {product.compatibility.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
