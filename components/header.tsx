"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"
import { CURRENCY_SYMBOL } from "@/lib/products"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const openModal = useModalStore((state) => state.openModal)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalItems = mounted ? getTotalItems() : 0
  const totalPrice = mounted ? getTotalPrice() : 0

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-wordmark.webp"
                  alt="LightBurn - Better Software for Laser Cutters"
                  width={180}
                  height={48}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/refund-policy"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Refund and Returns Policy
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Link href="#" className="hidden sm:flex text-gray-600 hover:text-primary transition-colors text-sm">
                Login / Register
              </Link>
              <button
                onClick={openModal}
                className="relative flex items-center gap-2 p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <span className="text-sm font-medium">
                  {totalPrice.toFixed(2)}
                  {CURRENCY_SYMBOL}
                </span>
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  openModal()
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-primary font-medium"
              >
                Shop
              </button>
              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
