"use client"

import { Check, Download, Shield } from "lucide-react"

const features = [
    "Instant delivery (1-30 minutes)",
    "No extra charges or hidden fees",
    "Safe and secure payments",
    "24/7 customer support",
    "Lifetime activation",
    "12 months free updates",
    "30-day money-back guarantee",
]

const compatibility = [
    "Ruida (CO2)",
    "GRBL (Diode and CO2 lasers)",
    "Smoothieboard",
    "TopWisdom",
    "EZCad2 & EZCad2-Lite (Galvo fiber, CO2, and UV)",
]

export function ProductDetailsSection({ dict }: { dict?: any }) {
    const features = dict?.features || [
        "Instant delivery (1-30 minutes)",
        "No extra charges or hidden fees",
        "Safe and secure payments",
        "24/7 customer support",
        "Lifetime activation",
        "12 months free updates",
        "30-day money-back guarantee",
    ]

    return (
        <section className="py-16 md:py-20 lg:py-24 border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* What You Get */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Download className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{dict?.whatYouGet || "What You Get"}</h3>
                        </div>

                        <div className="space-y-3">
                            {features.map((feature: string) => (
                                <div key={feature} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                        <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    <p className="text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compatible Controllers */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Shield className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{dict?.compatibleControllers || "Compatible Controllers"}</h3>
                        </div>

                        <div className="space-y-3">
                            {compatibility.map((controller) => (
                                <div key={controller} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                        <Check className="h-3 w-3 text-blue-600" />
                                    </div>
                                    <p className="text-gray-700">{controller}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
