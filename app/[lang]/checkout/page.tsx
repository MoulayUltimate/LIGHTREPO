import { getDictionary } from "@/lib/dictionary"
import { CheckoutClient } from "@/components/checkout-client"

export const runtime = 'edge'

import Script from "next/script"

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return (
        <>
            <Script id="google-ads-begin-checkout">
                {`
                    gtag('event', 'conversion', {
                        'send_to': 'AW-17873403949/qIXACPWe5OYbEK2A2spC',
                        'value': 1.0,
                        'currency': 'USD'
                    });
                `}
            </Script>
            <CheckoutClient dict={dict.checkout} />
        </>
    )
}
