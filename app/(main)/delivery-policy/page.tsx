import { ShieldCheck, Mail, Clock, Zap } from "lucide-react"

export default function DeliveryPolicyPage() {
    return (
        <div className="bg-white min-h-screen py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Digital Delivery Policy</h1>
                    <p className="text-lg text-gray-600">
                        Instant access to your software, delivered directly to your email.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Key Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                <Zap className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Instant Delivery</h3>
                            <p className="text-sm text-gray-600">
                                Your license key and download link are sent immediately after purchase.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                                <Mail className="h-5 w-5 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Email Delivery</h3>
                            <p className="text-sm text-gray-600">
                                Check your inbox (and spam folder) for an email from us containing your product.
                            </p>
                        </div>
                    </div>

                    {/* Detailed Policy */}
                    <div className="prose prose-gray max-w-none">
                        <h3>1. Digital Delivery Only</h3>
                        <p>
                            We sell digital software licenses only. <strong>No physical product will be shipped to your address.</strong> This allows us to provide instant access and eliminate shipping costs and delays.
                        </p>

                        <h3>2. Delivery Timeframe</h3>
                        <p>
                            In most cases, delivery is <strong>instant</strong>. Our automated system processes your order immediately after payment confirmation. You should receive your order confirmation email containing your license key and download instructions within <strong>1-10 minutes</strong>.
                        </p>
                        <p>
                            In rare cases where manual verification is required for security purposes, delivery may take up to 24 hours.
                        </p>

                        <h3>3. How to Access Your Purchase</h3>
                        <p>
                            Once your order is complete, you will receive an email with the subject line "Your Order is Ready". This email contains:
                        </p>
                        <ul>
                            <li>Your unique License Key</li>
                            <li>Official Download Link for the software</li>
                            <li>Installation Instructions</li>
                            <li>Invoice/Receipt</li>
                        </ul>

                        <h3>4. Haven't Received Your Email?</h3>
                        <p>
                            If you haven't received your email within 10 minutes of purchase, please check the following:
                        </p>
                        <ul>
                            <li><strong>Spam/Junk Folder:</strong> Sometimes our emails can be filtered by mistake.</li>
                            <li><strong>Promotions Tab:</strong> If you use Gmail, check the Promotions tab.</li>
                            <li><strong>Email Address:</strong> Verify that you entered the correct email address during checkout.</li>
                        </ul>
                        <p>
                            If you still cannot find your order, please contact our support team immediately, and we will resend your details.
                        </p>

                        <h3>5. System Requirements</h3>
                        <p>
                            Since this is a digital product, please ensure your computer meets the minimum system requirements before purchasing. We recommend using the free trial version first to verify compatibility with your laser cutter.
                        </p>
                    </div>

                    {/* Contact Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
                        <ShieldCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Need Help?</h3>
                        <p className="text-gray-600 mb-6">
                            If you have any issues with your delivery or installation, our support team is here to help 24/7.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
