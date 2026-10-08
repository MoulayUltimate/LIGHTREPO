"use client"

import { LocaleLink } from "@/components/ui/locale-link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, Zap } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useModalStore } from "@/lib/modal-store"
import { useCurrency } from "@/components/currency-provider"
import { products } from "@/lib/products"
import { reportAddToCart } from "@/lib/gtag"

export function Header({ dict }: { dict?: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const addItem = useCartStore((state) => state.addItem)
  const openModal = useModalStore((state) => state.openModal)
  const { symbol, price } = useCurrency()

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
      {/* Announcement Bar */}
      <div className="bg-primary text-white py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Zap className="h-4 w-4" />
          <span>
            {dict?.announcement || "Instant delivery • 30-day money-back guarantee • 24/7 support"}
          </span>
        </div>
      </div>

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
              <LocaleLink href="/" className="flex items-center">
                <Image
                  src="/logo-wordmark.webp"
                  alt="LightBurn - Better Software for Laser Cutters"
                  width={195}
                  height={40}
                  className="h-7 w-auto sm:h-8 lg:h-10"
                  priority
                />
              </LocaleLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <LocaleLink
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {dict?.home || "Home"}
              </LocaleLink>
              <LocaleLink
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {dict?.contact || "Contact Us"}
              </LocaleLink>
              <LocaleLink
                href="/refund-policy"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {dict?.refundPolicy || "Refund and Returns Policy"}
              </LocaleLink>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={openModal}
                className="relative flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
                aria-label={dict?.cart || "Cart"}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden lg:inline text-sm font-medium">
                  {symbol}{totalPrice.toFixed(2)}
                </span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  addItem(products[0])
                    reportAddToCart("header")
                  openModal()
                }}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
              >
                <Zap className="hidden h-4 w-4 sm:inline" />
                <span className="whitespace-nowrap">
                  {dict?.buyNow || "Buy Now"}
                  <span className="hidden sm:inline">
                    {" – "}
                    {symbol}
                    {price.toFixed(2)}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              <LocaleLink
                href="/"
                className="block py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {dict?.home || "Home"}
              </LocaleLink>
              <button
                onClick={() => {
                  openModal()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-primary font-medium"
              >
                {dict?.shop || "Shopping Cart"}
              </button>
              <LocaleLink
                href="/contact"
                className="block py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {dict?.contact || "Contact"}
              </LocaleLink>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
