import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductModal } from "@/components/product-modal"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { Suspense } from "react"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Suspense fallback={null}>
                <AnalyticsTracker />
            </Suspense>
            <Header />
            <main>{children}</main>
            <Footer />
            <ProductModal />
        </>
    )
}
