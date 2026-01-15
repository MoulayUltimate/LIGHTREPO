import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t bg-gray-50">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Information */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-gray-900">Information</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/refund-policy"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    Refund and Returns Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-gray-900">Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/account"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cart"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/checkout"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    Checkout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/wishlist"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-gray-900">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center">
                    <p className="text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} Lightburn Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
