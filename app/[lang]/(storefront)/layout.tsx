import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductModal } from "@/components/product-modal"
import { getDictionary } from "@/lib/dictionary"

/**
 * Storefront chrome. Lives in its own route group so the admin panel, which
 * now sits under the same [lang] root, does not inherit the shop's header,
 * footer and cart drawer.
 */
export default async function StorefrontLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return (
        <>
            <Header dict={dict.header} />
            <main>{children}</main>
            <Footer dict={dict.footer} />
            <ProductModal dict={dict.cart} />
        </>
    )
}
