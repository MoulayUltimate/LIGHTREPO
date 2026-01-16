import { getDictionary } from "@/lib/dictionary"
import { CheckoutClient } from "@/components/checkout-client"

export const runtime = 'edge'

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return <CheckoutClient dict={dict.checkout} />
}
