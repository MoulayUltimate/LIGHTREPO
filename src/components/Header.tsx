'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const totalItems = getTotalItems();

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-primary to-red-700 text-white py-2">
                <div className="container-custom">
                    <p className="text-center text-sm font-medium">
                        🎉 Limited Time Offer: Save 72% + Get Instant Delivery!
                    </p>
                </div>
            </div>

            {/* Main Header */}
            <div className="border-b border-gray-100">
                <div className="container-custom">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex flex-col group">
                            <div className="text-primary text-2xl md:text-3xl font-bold tracking-wider transition-opacity group-hover:opacity-80">
                                LIGHTBURN
                            </div>
                            <span className="text-[9px] text-gray-500 tracking-widest uppercase -mt-1">
                                Better Software For Laser Cutters
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                            <Link
                                href="/#product"
                                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
                            >
                                Products
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
                            >
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search Icon */}
                            <button
                                className="hidden md:block text-gray-600 hover:text-primary transition-colors"
                                aria-label="Search"
                            >
                                <Search className="h-5 w-5" />
                            </button>

                            {/* Account */}
                            <Link
                                href="/account"
                                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                            >
                                <User className="h-5 w-5" />
                                <span className="text-sm font-medium">Account</span>
                            </Link>

                            {/* Cart */}
                            <Link href="/cart" className="relative group">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-primary transition-colors" />
                                    <span className="text-sm font-medium text-gray-700">Cart</span>
                                    {totalItems > 0 && (
                                        <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden text-gray-700 p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-100 py-4">
                            <nav className="flex flex-col space-y-4">
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/#product"
                                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Products
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                                <Link
                                    href="/account"
                                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    My Account
                                </Link>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
