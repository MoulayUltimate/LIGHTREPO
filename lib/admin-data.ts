import { db } from "@/lib/db"
import { visitors, pageViews, orders, contactMessages, externalClicks } from "@/db/schema"
import { sql, desc, count, countDistinct, eq } from "drizzle-orm"

/**
 * Server-side data for the admin panel.
 *
 * Every query is guarded on its own. The previous /api/analytics/stats had a
 * single try/catch around everything, so one failing query returned a 500 and
 * the whole page showed nothing. Here a failure degrades to an empty section
 * and the rest of the panel still renders.
 */
async function safe<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
    try {
        return await run()
    } catch (error) {
        console.error(`admin-data: ${label} failed`, error)
        return fallback
    }
}

const secondsAgo = (ms: number) => Math.floor((Date.now() - ms) / 1000)

// Admin page views are the shop owner browsing their own panel, not customer
// traffic. The tracker no longer records them, but rows logged before that
// change are still in the table, so they are excluded here too.
const notAdminView = sql`${pageViews.path} NOT LIKE '%/admin%'`
const visitedStorefront = sql`${visitors.id} IN (SELECT DISTINCT visitor_id FROM page_views WHERE path NOT LIKE '%/admin%')`

export type Totals = {
    visitors: number
    pageViews: number
    orders: number
    paidOrders: number
    revenueCents: number
    messages: number
    buyClicks: number
}

export async function getTotals(): Promise<Totals> {
    const [v, pv, allOrders, msgs, clicks] = await Promise.all([
        safe("visitors", async () => (await db.select({ c: countDistinct(pageViews.visitorId) }).from(pageViews).where(notAdminView).get())?.c ?? 0, 0),
        safe("pageViews", async () => (await db.select({ c: count() }).from(pageViews).where(notAdminView).get())?.c ?? 0, 0),
        safe("orders", async () => await db.select().from(orders).all(), [] as any[]),
        safe("messages", async () => (await db.select({ c: count() }).from(contactMessages).get())?.c ?? 0, 0),
        safe("buyClicks", async () => (await db.select({ c: count() }).from(externalClicks).get())?.c ?? 0, 0),
    ])

    const paid = allOrders.filter((o: any) => o.status === "paid")

    return {
        visitors: v,
        pageViews: pv,
        orders: allOrders.length,
        paidOrders: paid.length,
        revenueCents: paid.reduce((sum: number, o: any) => sum + (o.amount ?? 0), 0),
        messages: msgs,
        buyClicks: clicks,
    }
}

export async function getTopPages(limit = 8) {
    return safe(
        "topPages",
        async () =>
            await db
                .select({ path: pageViews.path, views: count() })
                .from(pageViews)
                .where(notAdminView)
                .groupBy(pageViews.path)
                .orderBy(desc(count()))
                .limit(limit)
                .all(),
        [] as { path: string; views: number }[],
    )
}

export async function getCountries(limit = 10) {
    return safe(
        "countries",
        async () =>
            await db
                .select({ country: visitors.country, visitors: count() })
                .from(visitors)
                .where(visitedStorefront)
                .groupBy(visitors.country)
                .orderBy(desc(count()))
                .limit(limit)
                .all(),
        [] as { country: string | null; visitors: number }[],
    )
}

export async function getDevices() {
    return safe(
        "devices",
        async () =>
            await db
                .select({ type: visitors.deviceType, visitors: count() })
                .from(visitors)
                .where(visitedStorefront)
                .groupBy(visitors.deviceType)
                .all(),
        [] as { type: string | null; visitors: number }[],
    )
}

/** Clicks on the checkout buttons, grouped by where on the page they happened. */
export async function getBuyClicksByLocation() {
    return safe(
        "buyClicksByLocation",
        async () =>
            await db
                .select({ location: externalClicks.location, clicks: count() })
                .from(externalClicks)
                .groupBy(externalClicks.location)
                .orderBy(desc(count()))
                .all(),
        [] as { location: string; clicks: number }[],
    )
}

export async function getRecentBuyClicks(limit = 20) {
    return safe(
        "recentBuyClicks",
        async () =>
            await db
                .select()
                .from(externalClicks)
                .orderBy(desc(externalClicks.createdAt))
                .limit(limit)
                .all(),
        [] as any[],
    )
}

/** Page views per day for the last `days` days, built from real rows. */
export async function getDailyTraffic(days = 7) {
    const since = secondsAgo(days * 24 * 60 * 60)

    const rows = await safe(
        "dailyTraffic",
        async () =>
            await db
                .select({ visitorId: pageViews.visitorId, createdAt: pageViews.createdAt })
                .from(pageViews)
                .where(sql`${pageViews.createdAt} > ${since} AND ${pageViews.path} NOT LIKE '%/admin%'`)
                .all(),
        [] as { visitorId: string | null; createdAt: Date | number | null }[],
    )

    // Bucket by calendar day, newest day last.
    const buckets = new Map<string, { views: number; visitors: Set<string> }>()
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        buckets.set(d.toISOString().slice(0, 10), { views: 0, visitors: new Set() })
    }

    for (const row of rows) {
        const raw = row.createdAt
        const ms = raw instanceof Date ? raw.getTime() : Number(raw) * 1000
        if (!Number.isFinite(ms)) continue
        const key = new Date(ms).toISOString().slice(0, 10)
        const bucket = buckets.get(key)
        if (!bucket) continue
        bucket.views++
        if (row.visitorId) bucket.visitors.add(row.visitorId)
    }

    return Array.from(buckets.entries()).map(([date, b]) => ({
        date,
        views: b.views,
        visitors: b.visitors.size,
    }))
}

export async function getOrders(limit = 100) {
    return safe(
        "ordersList",
        async () => await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit).all(),
        [] as any[],
    )
}

export async function getOrdersByStatus(status: string, limit = 100) {
    return safe(
        `orders:${status}`,
        async () =>
            await db
                .select()
                .from(orders)
                .where(eq(orders.status, status))
                .orderBy(desc(orders.createdAt))
                .limit(limit)
                .all(),
        [] as any[],
    )
}

export async function getMessages(limit = 100) {
    return safe(
        "messages",
        async () =>
            await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(limit).all(),
        [] as any[],
    )
}
