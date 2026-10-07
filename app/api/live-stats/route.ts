import { NextResponse } from "next/server"
import { requireAdminApi } from "@/lib/admin-auth"
import { db } from "@/lib/db"
import { visitors, pageViews, orders } from "@/db/schema"
import { sql, count, inArray } from "drizzle-orm"

export const runtime = "edge"

const WINDOW_MINUTES = 10

/**
 * Live activity for the admin panel.
 *
 * Field names say what they measure. The previous version returned a
 * ten-minute figure as "totalSales", counted page views as "sessions", and
 * matched the checkout page with path = '/checkout' — which stopped matching
 * anything once routes gained a locale prefix, so "checking out" sat at zero
 * while the visitor list beside it correctly showed people checking out.
 */
export async function GET(req: Request) {
    const denied = await requireAdminApi(req)
    if (denied) return denied

    const since = Math.floor((Date.now() - WINDOW_MINUTES * 60 * 1000) / 1000)

    const empty = {
        windowMinutes: WINDOW_MINUTES,
        visitorsNow: 0,
        pageViewsNow: 0,
        checkingOutNow: 0,
        abandonedNow: 0,
        purchasedNow: 0,
        salesNow: 0,
        salesAllTime: 0,
        ordersAllTime: 0,
        visitorDetails: [] as any[],
    }

    try {
        let recentPageViews: any[] = []
        let visitorsNow = 0
        let pageViewsNow = 0
        let checkingOutNow = 0

        try {
            recentPageViews = await db
                .select({ visitorId: pageViews.visitorId, path: pageViews.path, createdAt: pageViews.createdAt })
                .from(pageViews)
                .where(sql`${pageViews.createdAt} > ${since}`)
                .all()

            visitorsNow = new Set(recentPageViews.map((pv) => pv.visitorId).filter(Boolean)).size
            pageViewsNow = recentPageViews.length

            // Routes carry a locale prefix (/en/checkout), and /checkout/success
            // is a completed purchase rather than someone still checking out.
            checkingOutNow = new Set(
                recentPageViews
                    .filter((pv) => typeof pv.path === "string" && /\/checkout\/?$/.test(pv.path))
                    .map((pv) => pv.visitorId)
                    .filter(Boolean),
            ).size
        } catch (e) {
            console.error("live-stats: recent page views failed", e)
        }

        let recentOrders: any[] = []
        try {
            recentOrders = await db
                .select()
                .from(orders)
                .where(sql`${orders.createdAt} > ${since}`)
                .all()
        } catch (e) {
            console.error("live-stats: recent orders failed", e)
        }

        const paidNow = recentOrders.filter((o) => o.status === "paid")
        const purchasedNow = paidNow.length
        const salesNow = paidNow.reduce((sum, o) => sum + (o.amount || 0), 0) / 100
        const abandonedNow = recentOrders.filter((o) => o.status === "abandoned").length

        // Genuine lifetime totals, so the panel shows a real revenue figure
        // rather than a ten-minute slice labelled as a total.
        let salesAllTime = 0
        let ordersAllTime = 0
        try {
            const allPaid = await db
                .select({ amount: orders.amount })
                .from(orders)
                .where(sql`${orders.status} = 'paid'`)
                .all()
            ordersAllTime = allPaid.length
            salesAllTime = allPaid.reduce((sum, o) => sum + (o.amount || 0), 0) / 100
        } catch (e) {
            console.error("live-stats: lifetime totals failed", e)
        }

        let visitorDetails: any[] = []
        try {
            const recentVisitorIds = new Set(recentPageViews.map((pv) => pv.visitorId).filter(Boolean))
            if (recentVisitorIds.size > 0) {
                const recentVisitors = await db
                    .select()
                    .from(visitors)
                    .where(inArray(visitors.id, Array.from(recentVisitorIds) as string[]))
                    .all()

                for (const visitor of recentVisitors) {
                    const views = recentPageViews.filter((pv) => pv.visitorId === visitor.id)
                    if (views.length === 0) continue

                    const latest = views[views.length - 1]
                    const currentPage = latest?.path || "/"

                    const visitorOrder = recentOrders.find((o) => {
                        const orderTime = o.createdAt
                        const visitorTime = latest?.createdAt || visitor.createdAt
                        if (!orderTime || !visitorTime) return false
                        const diff = Math.abs((orderTime as Date).getTime() - (visitorTime as Date).getTime())
                        return diff < 5 * 60 * 1000
                    })

                    let status = "browsing"
                    if (/\/checkout/.test(currentPage)) status = "checking_out"
                    if (visitorOrder) {
                        if (visitorOrder.status === "paid") status = "paid"
                        else if (visitorOrder.status === "pending") status = "checking_out"
                        else if (visitorOrder.status === "abandoned" && status !== "checking_out") status = "abandoned"
                    }

                    const at = latest?.createdAt || visitor.createdAt
                    visitorDetails.push({
                        id: String(visitor.id).substring(0, 8),
                        country: visitor.country || "Unknown",
                        enteredAt: at ? Math.floor((at as Date).getTime() / 1000) : Math.floor(Date.now() / 1000),
                        status,
                        currentPage,
                    })
                }
            }
        } catch (e) {
            console.error("live-stats: visitor details failed", e)
        }

        return NextResponse.json({
            windowMinutes: WINDOW_MINUTES,
            visitorsNow,
            pageViewsNow,
            checkingOutNow,
            abandonedNow,
            purchasedNow,
            salesNow,
            salesAllTime,
            ordersAllTime,
            visitorDetails,
        })
    } catch (error) {
        console.error("live-stats failed", error)
        return NextResponse.json(empty)
    }
}
