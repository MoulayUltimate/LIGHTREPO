import { db } from "@/lib/db"
import { visitors, pageViews, orders, contactMessages, externalClicks } from "@/db/schema"
import { sql, desc, count, countDistinct, eq, and, type SQL } from "drizzle-orm"
import { resolveRange, localDateKey, localHour, utcOffsetSeconds, type ResolvedRange } from "@/lib/admin-range"

/**
 * Server-side data for the admin panel.
 *
 * Every query is guarded on its own. A single try/catch around everything
 * meant one failing query returned nothing at all; here a failure degrades to
 * an empty section and the rest of the panel still renders.
 */
async function safe<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
    try {
        return await run()
    } catch (error) {
        console.error(`admin-data: ${label} failed`, error)
        return fallback
    }
}

// Admin page views are the shop owner browsing their own panel, not customer
// traffic. The tracker no longer records them, but rows logged before that
// change are still in the table, so they are excluded here too.
const notAdminView = sql`${pageViews.path} NOT LIKE '%/admin%'`

// Add-to-cart presses share the external_clicks table under a "cart:" prefix.
// Checkout figures must exclude them: one is intent, the other is a departure
// to Stripe, and adding them together would overstate checkout clicks.
const isCheckoutClick = sql`${externalClicks.location} NOT LIKE 'cart:%'`
const isAddToCart = sql`${externalClicks.location} LIKE 'cart:%'`

/** Time bounds for a column, as drizzle conditions. */
function bounds(column: SQL | any, range: ResolvedRange): SQL[] {
    const parts: SQL[] = []
    if (range.since !== null) parts.push(sql`${column} >= ${range.since}`)
    if (range.until !== null) parts.push(sql`${column} < ${range.until}`)
    return parts
}

function viewsWhere(range: ResolvedRange) {
    return and(notAdminView, ...bounds(pageViews.createdAt, range))
}

/** Visitors who reached the shop (not just the panel) inside the range. */
function storefrontVisitorsWhere(range: ResolvedRange) {
    const since = range.since === null ? 0 : range.since
    const until = range.until === null ? 99999999999 : range.until
    return sql`${visitors.id} IN (
        SELECT DISTINCT visitor_id FROM page_views
        WHERE path NOT LIKE '%/admin%'
          AND created_at >= ${since} AND created_at < ${until}
    )`
}

export type Totals = {
    visitors: number
    pageViews: number
    orders: number
    paidOrders: number
    revenueCents: number
    messages: number
    buyClicks: number
}

export async function getTotals(range: ResolvedRange = resolveRange("all")): Promise<Totals> {
    const orderBounds = bounds(orders.createdAt, range)
    const msgBounds = bounds(contactMessages.createdAt, range)
    const clickBounds = bounds(externalClicks.createdAt, range)

    const [v, pv, rangeOrders, msgs, clicks] = await Promise.all([
        safe("visitors", async () =>
            (await db.select({ c: countDistinct(pageViews.visitorId) }).from(pageViews).where(viewsWhere(range)).get())?.c ?? 0, 0),
        safe("pageViews", async () =>
            (await db.select({ c: count() }).from(pageViews).where(viewsWhere(range)).get())?.c ?? 0, 0),
        safe("orders", async () =>
            orderBounds.length
                ? await db.select().from(orders).where(and(...orderBounds)).all()
                : await db.select().from(orders).all(), [] as any[]),
        safe("messages", async () =>
            (msgBounds.length
                ? await db.select({ c: count() }).from(contactMessages).where(and(...msgBounds)).get()
                : await db.select({ c: count() }).from(contactMessages).get())?.c ?? 0, 0),
        safe("buyClicks", async () =>
            (await db.select({ c: count() }).from(externalClicks)
                .where(and(isCheckoutClick, ...clickBounds)).get())?.c ?? 0, 0),
    ])

    const paid = rangeOrders.filter((o: any) => o.status === "paid")

    return {
        visitors: v,
        pageViews: pv,
        orders: rangeOrders.length,
        paidOrders: paid.length,
        revenueCents: paid.reduce((sum: number, o: any) => sum + (o.amount ?? 0), 0),
        messages: msgs,
        buyClicks: clicks,
    }
}

export async function getTopPages(range: ResolvedRange, limit = 8) {
    return safe(
        "topPages",
        async () =>
            await db
                .select({ path: pageViews.path, views: count() })
                .from(pageViews)
                .where(viewsWhere(range))
                .groupBy(pageViews.path)
                .orderBy(desc(count()))
                .limit(limit)
                .all(),
        [] as { path: string; views: number }[],
    )
}

export async function getCountries(range: ResolvedRange, limit = 10) {
    return safe(
        "countries",
        async () =>
            await db
                .select({ country: visitors.country, visitors: count() })
                .from(visitors)
                .where(storefrontVisitorsWhere(range))
                .groupBy(visitors.country)
                .orderBy(desc(count()))
                .limit(limit)
                .all(),
        [] as { country: string | null; visitors: number }[],
    )
}

export async function getDevices(range: ResolvedRange) {
    return safe(
        "devices",
        async () =>
            await db
                .select({ type: visitors.deviceType, visitors: count() })
                .from(visitors)
                .where(storefrontVisitorsWhere(range))
                .groupBy(visitors.deviceType)
                .all(),
        [] as { type: string | null; visitors: number }[],
    )
}

/** Clicks on the checkout buttons, grouped by where on the page they happened. */
export async function getBuyClicksByLocation(range: ResolvedRange) {
    const b = bounds(externalClicks.createdAt, range)
    return safe(
        "buyClicksByLocation",
        async () => {
            return await db
                .select({ location: externalClicks.location, clicks: count() })
                .from(externalClicks)
                .where(and(isCheckoutClick, ...b))
                .groupBy(externalClicks.location)
                .orderBy(desc(count()))
                .all()
        },
        [] as { location: string; clicks: number }[],
    )
}

/** Which destination link was clicked — the Stripe URL has changed before. */
export async function getClicksByUrl(range: ResolvedRange) {
    const b = bounds(externalClicks.createdAt, range)
    return safe(
        "clicksByUrl",
        async () => {
            return await db
                .select({ url: externalClicks.linkUrl, clicks: count() })
                .from(externalClicks)
                .where(and(isCheckoutClick, ...b))
                .groupBy(externalClicks.linkUrl)
                .orderBy(desc(count()))
                .all()
        },
        [] as { url: string; clicks: number }[],
    )
}

/** Individual clicks, newest first, for the detail table. */
export async function getRecentClicks(range: ResolvedRange, limit = 25) {
    const b = bounds(externalClicks.createdAt, range)
    return safe(
        "recentClicks",
        async () => {
            return await db
                .select()
                .from(externalClicks)
                .where(and(isCheckoutClick, ...b))
                .orderBy(desc(externalClicks.createdAt))
                .limit(limit)
                .all()
        },
        [] as any[],
    )
}

/** Distinct visitors who clicked a checkout button, for click-through rate. */
export async function getUniqueClickers(range: ResolvedRange): Promise<number> {
    const b = bounds(externalClicks.createdAt, range)
    return safe(
        "uniqueClickers",
        async () => {
            return (await db
                .select({ c: countDistinct(externalClicks.visitorId) })
                .from(externalClicks)
                .where(and(isCheckoutClick, ...b))
                .get())?.c ?? 0
        },
        0,
    )
}

/** Add-to-cart presses by button, with the "cart:" prefix stripped. */
export async function getAddToCartByLocation(range: ResolvedRange) {
    const b = bounds(externalClicks.createdAt, range)
    return safe(
        "addToCartByLocation",
        async () => {
            const rows = await db
                .select({ location: externalClicks.location, clicks: count() })
                .from(externalClicks)
                .where(and(isAddToCart, ...b))
                .groupBy(externalClicks.location)
                .orderBy(desc(count()))
                .all()
            return rows.map((r) => ({ location: String(r.location).replace(/^cart:/, ""), clicks: r.clicks }))
        },
        [] as { location: string; clicks: number }[],
    )
}

export type TrafficPoint = { label: string; views: number; visitors: number }

/**
 * Traffic over the selected range, counted from real rows. Short ranges are
 * bucketed by hour so "today" is not a single bar.
 */
export async function getTraffic(range: ResolvedRange): Promise<TrafficPoint[]> {
    const rows = await safe(
        "traffic",
        async () =>
            await db
                .select({ visitorId: pageViews.visitorId, createdAt: pageViews.createdAt })
                .from(pageViews)
                .where(viewsWhere(range))
                .all(),
        [] as { visitorId: string | null; createdAt: Date | number | null }[],
    )

    // Buckets are keyed in the shop owner's local day, not the server's UTC day.
    const toSeconds = (raw: unknown) =>
        raw instanceof Date ? Math.floor(raw.getTime() / 1000) : Number(raw)

    const buckets = new Map<string, { views: number; visitors: Set<string> }>()

    if (range.hourly) {
        for (let h = 0; h < 24; h++) {
            buckets.set(String(h).padStart(2, "0") + ":00", { views: 0, visitors: new Set() })
        }
        for (const row of rows) {
            const secs = toSeconds(row.createdAt)
            if (!Number.isFinite(secs)) continue
            const key = String(localHour(secs)).padStart(2, "0") + ":00"
            const b = buckets.get(key)
            if (!b) continue
            b.views++
            if (row.visitorId) b.visitors.add(row.visitorId)
        }
    } else {
        const nowSeconds = Math.floor(Date.now() / 1000)
        const days = range.since === null ? 30 : Math.max(1, Math.round((nowSeconds - range.since) / 86400))
        for (let i = days - 1; i >= 0; i--) {
            buckets.set(localDateKey(nowSeconds - i * 86400), { views: 0, visitors: new Set() })
        }
        for (const row of rows) {
            const secs = toSeconds(row.createdAt)
            if (!Number.isFinite(secs)) continue
            const b = buckets.get(localDateKey(secs))
            if (!b) continue
            b.views++
            if (row.visitorId) b.visitors.add(row.visitorId)
        }
    }

    void utcOffsetSeconds

    return Array.from(buckets.entries()).map(([label, b]) => ({
        label,
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
