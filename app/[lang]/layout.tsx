import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductModal } from "@/components/product-modal"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { Suspense } from "react"
import { headers } from "next/headers"
import { getCurrencyFromCountry } from "@/lib/currency"
import { CurrencyProvider } from "@/components/currency-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Lightburn Pro – Better Software For Laser Cutters",
    description:
        "Transform your laser cutting workflow with LightBurn Pro. One-time payment, instant delivery, trusted by 50,000+ professionals. Save 72% today!",
    generator: "v0.app",
    keywords: ["lightburn", "laser engraving", "laser cutting", "software", "CNC"],
    icons: {
        icon: "/logo-icon.webp",
        apple: "/logo-icon.webp",
    },
}

export const viewport: Viewport = {
    themeColor: "#8B1A1A",
    width: "device-width",
    initialScale: 1,
}

import { getDictionary } from "@/lib/dictionary"

import Script from "next/script"

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    const headersList = await headers()
    const country = headersList.get("cf-ipcountry")
    let currency = getCurrencyFromCountry(country)

    // If language is an EU language and currency defaulted to USD (e.g. no country detected or non-EU IP), force EUR
    const EU_LANGS = ['de', 'fr', 'es', 'it', 'nl', 'pt']
    if (EU_LANGS.includes(lang) && currency === 'USD') {
        currency = 'EUR'
    }

    const dict = await getDictionary(lang)

    return (
        <html lang={lang}>
            <body className="font-sans antialiased">
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=GT-WVGM2MHR"
                    strategy="afterInteractive"
                />
                <Script id="google-tag-gt" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'GT-WVGM2MHR');
                    `}
                </Script>
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=AW-17873403949"
                    strategy="afterInteractive"
                />
                <Script id="google-ads-tag" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-17873403949');
                    `}
                </Script>
                <CurrencyProvider initialCurrency={currency}>
                    <Suspense fallback={null}>
                        <AnalyticsTracker />
                    </Suspense>
                    <Header dict={dict.header} />
                    <main>{children}</main>
                    <Footer dict={dict.footer} />
                    <ProductModal dict={dict.cart} />
                </CurrencyProvider>
            </body>
        </html>
    )
}
