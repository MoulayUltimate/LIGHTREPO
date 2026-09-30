// Google Ads conversion reporting.
//
// Mirrors Google's gtag_report_conversion snippet, with one important
// difference: navigation is also fired from a timeout, so a blocked, slow or
// failed tag can never strand the customer on the page instead of sending
// them to checkout.

const BEGIN_CHECKOUT_SEND_TO = "AW-18484535885/ZizMCIKR3osdEM3Eju5E"

// Google's snippet defaults; used when a caller has no live price to pass.
const DEFAULT_VALUE = 1.0
const DEFAULT_CURRENCY = "EUR"

// Longest we wait for the tag before navigating anyway.
const NAVIGATE_TIMEOUT_MS = 1000

type ConversionOptions = {
    /** Where to send the customer once the event has been reported. */
    url?: string
    /** Order value; falls back to Google's placeholder when unknown. */
    value?: number
    /** ISO currency code matching `value`. */
    currency?: string
}

/**
 * Report a "begin checkout" conversion, then navigate to `url` if given.
 * Safe to call when gtag is unavailable — navigation still happens.
 */
export function reportBeginCheckout({ url, value, currency }: ConversionOptions = {}) {
    const navigate = () => {
        if (url) window.location.href = url
    }

    const gtag = typeof window !== "undefined" ? (window as any).gtag : undefined

    if (typeof gtag !== "function") {
        navigate()
        return
    }

    let navigated = false
    const navigateOnce = () => {
        if (navigated) return
        navigated = true
        navigate()
    }

    // Whichever comes first: the tag's callback, or the timeout.
    if (url) {
        window.setTimeout(navigateOnce, NAVIGATE_TIMEOUT_MS)
    }

    gtag("event", "conversion", {
        send_to: BEGIN_CHECKOUT_SEND_TO,
        value: value ?? DEFAULT_VALUE,
        currency: currency ?? DEFAULT_CURRENCY,
        event_callback: navigateOnce,
    })
}
