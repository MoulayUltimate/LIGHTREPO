"use client"

import Link from "next/link"
import Image from "next/image"
import { useModalStore } from "@/lib/modal-store"

export function Footer() {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo-icon.webp" alt="LightBurn" width={48} height={48} className="h-12 w-12 rounded-lg" />
              <div>
                <span className="text-xl font-bold tracking-wider text-white">LIGHTBURN</span>
                <p className="text-xs text-gray-400">Better Software For Laser Cutters</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Professional-grade laser engraving software. One-time purchase, lifetime activation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={openModal} className="text-sm hover:text-white transition-colors text-left">
                  Shop
                </button>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/delivery-policy" className="text-sm hover:text-white transition-colors">
                  Delivery Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <span className="text-sm">24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} LightBurn Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
