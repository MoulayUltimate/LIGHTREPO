import { requireAdmin } from "@/lib/admin-auth"
import { resolveRange } from "@/lib/admin-range"
import { DashboardView } from "@/components/admin/dashboard-view"
import { OrdersView } from "@/components/admin/orders-view"
import { MissedView } from "@/components/admin/missed-view"
import { MessagesView } from "@/components/admin/messages-view"
import { AnalyticsView } from "@/components/admin/analytics-view"
import { LiveView } from "@/components/admin/live-view"

export const runtime = "edge"

/**
 * The whole admin panel is one route, selected by ?view=.
 *
 * Each separate admin route compiled to its own ~1.4 MB edge function because
 * every one pulled in Drizzle, and seven of them pushed the Pages Functions
 * bundle past Cloudflare's 25 MiB limit. Collapsing them into a single
 * function keeps the server-side data access without that cost.
 */
export default async function AdminPage({
    params,
    searchParams,
}: {
    params: Promise<{ lang: string }>
    searchParams: Promise<{ view?: string; range?: string }>
}) {
    const { lang } = await params
    await requireAdmin(lang)

    const { view, range } = await searchParams

    switch (view) {
        case "orders":
            return <OrdersView />
        case "missed":
            return <MissedView />
        case "messages":
            return <MessagesView />
        case "analytics":
            return <AnalyticsView lang={lang} range={resolveRange(range)} />
        case "live":
            return <LiveView />
        default:
            return <DashboardView lang={lang} />
    }
}
