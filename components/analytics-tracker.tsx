"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function AnalyticsTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [visitorId, setVisitorId] = useState<string>("")

    useEffect(() => {
        // Generate or retrieve visitor ID
        let storedId = localStorage.getItem("lb_visitor_id")
        if (!storedId) {
            storedId = crypto.randomUUID()
            localStorage.setItem("lb_visitor_id", storedId)
        }
        setVisitorId(storedId)
    }, [])

    useEffect(() => {
        if (!visitorId) return

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

        // Send tracking data
        fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                path: url,
                referrer: document.referrer,
                visitorId: visitorId,
            }),
        }).catch((err) => console.error("Tracking failed", err))

    }, [pathname, searchParams, visitorId])

    return null
}
