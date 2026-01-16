import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductModal } from "@/components/product-modal"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { Suspense } from "react"

import { headers } from "next/headers"
import { getCurrencyFromCountry } from "@/lib/currency"
import { CurrencyProvider } from "@/components/currency-provider"

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headersList = await headers()
    const country = headersList.get("cf-ipcountry")
    const currency = getCurrencyFromCountry(country)

    return (
        <CurrencyProvider initialCurrency={currency}>
            <Suspense fallback={null}>
                <AnalyticsTracker />
            </Suspense>
            <Header />
            <main>{children}</main>
            <Footer />
            <ProductModal />
        </CurrencyProvider>
    )
}
