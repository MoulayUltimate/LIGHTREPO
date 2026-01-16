import { NextResponse } from "next/server"
import { drizzle } from "drizzle-orm/d1"
import { visitors, pageViews, orders } from "@/db/schema"
import { sql, count, inArray } from "drizzle-orm"

export const runtime = "edge"

export async function GET(req: Request) {
    try {
        const db = drizzle(process.env.DB as D1Database)

        // Calculate 10 minutes ago timestamp
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
        const tenMinutesAgoTimestamp = Math.floor(tenMinutesAgo.getTime() / 1000)

        let uniqueVisitors = 0
        let sessions = 0
        let activeCarts = 0
        let recentOrders: any[] = []
        let recentPageViews: any[] = []

        // 1. Visitors right now (unique visitors in last 10 min)
        try {
            recentPageViews = await db
                .select({ visitorId: pageViews.visitorId, path: pageViews.path, createdAt: pageViews.createdAt })
                .from(pageViews)
                .where(sql`${pageViews.createdAt} > ${tenMinutesAgoTimestamp}`)
                .all()

            uniqueVisitors = new Set(recentPageViews.map(pv => pv.visitorId).filter(Boolean)).size
        } catch (e) {
            console.error("Error fetching page views:", e)
        }

        // 2. Sessions (total page views in last 10 min)
        try {
            const sessionsResult = await db
                .select({ count: count() })
                .from(pageViews)
                .where(sql`${pageViews.createdAt} > ${tenMinutesAgoTimestamp}`)
                .get()

            sessions = sessionsResult?.count || 0
        } catch (e) {
            console.error("Error fetching sessions:", e)
        }

        // 3. Active carts (visitors on /checkout page in last 10 min)
        try {
            const activeCartsResult = await db
                .select({ visitorId: pageViews.visitorId })
                .from(pageViews)
                .where(sql`${pageViews.path} = '/checkout' AND ${pageViews.createdAt} > ${tenMinutesAgoTimestamp}`)
                .all()

            activeCarts = new Set(activeCartsResult.map(pv => pv.visitorId).filter(Boolean)).size
        } catch (e) {
            console.error("Error fetching active carts:", e)
        }

        // 4. Orders in last 10 min
        try {
            recentOrders = await db
                .select()
                .from(orders)
                .where(sql`${orders.createdAt} > ${tenMinutesAgoTimestamp}`)
                .all()
        } catch (e) {
            console.error("Error fetching orders:", e)
            recentOrders = []
        }

        // 5. Calculate stats from orders
        const purchased = recentOrders.filter(o => o.status === 'paid').length
        const totalSales = recentOrders
            .filter(o => o.status === 'paid')
            .reduce((sum, o) => sum + (o.amount || 0), 0) / 100

        const totalOrders = recentOrders.filter(o => o.status !== 'abandoned').length
        const checkingOut = activeCarts
        const abandonedCarts = recentOrders.filter(o => o.status === 'abandoned').length
        const totalActiveCarts = abandonedCarts

        // 6. Get detailed visitor list with status, country, and time
        let visitorDetails: any[] = []
        try {
            const recentVisitorIds = new Set(recentPageViews.map(pv => pv.visitorId).filter(Boolean))
            if (recentVisitorIds.size > 0) {
                const recentVisitors = await db
                    .select()
                    .from(visitors)
                    .where(inArray(visitors.id, Array.from(recentVisitorIds)))
                    .all()

                for (const visitor of recentVisitors) {
                    const visitorPageViews = recentPageViews.filter(pv => pv.visitorId === visitor.id)
                    if (visitorPageViews.length === 0) continue

                    const latestView = visitorPageViews[visitorPageViews.length - 1]
                    const currentPage = latestView?.path || '/'

                    // Find order for this visitor by email or timing
                    const visitorOrder = recentOrders.find(o => {
                        const orderTime = o.createdAt
                        const visitorTime = latestView?.createdAt || visitor.createdAt

                        // Check if times exist and are valid
                        if (!orderTime || !visitorTime) return false

                        // Calculate difference in milliseconds (since Drizzle returns Date objects)
                        const diff = Math.abs((orderTime as Date).getTime() - (visitorTime as Date).getTime())

                        // Match if within 5 minutes (300,000 ms)
                        return diff < 5 * 60 * 1000
                    })

                    let status = 'browsing'
                    if (currentPage.includes('/checkout')) {
                        status = 'checking_out'
                    }
                    if (visitorOrder) {
                        if (visitorOrder.status === 'paid') {
                            status = 'paid'
                        } else if (visitorOrder.status === 'abandoned') {
                            // Only show abandoned if they are NOT currently checking out
                            if (status !== 'checking_out') {
                                status = 'abandoned'
                            }
                        } else if (visitorOrder.status === 'pending') {
                            status = 'checking_out'
                        }
                    }

                    visitorDetails.push({
                        id: visitor.id.substring(0, 8),
                        country: visitor.country || 'Unknown',
                        enteredAt: latestView?.createdAt || visitor.createdAt,
                        status: status,
                        currentPage: currentPage,
                    })
                }

                visitorDetails.sort((a, b) => (b.enteredAt || 0) - (a.enteredAt || 0))
            }
        } catch (e) {
            console.error("Error fetching visitor details:", e)
        }

        return NextResponse.json({
            visitorsNow: uniqueVisitors,
            sessions: sessions,
            totalSales: totalSales,
            totalOrders: totalOrders,
            activeCarts: totalActiveCarts,
            checkingOut: checkingOut,
            purchased: purchased,
            visitorDetails: visitorDetails,
        })
    } catch (error) {
        console.error("Live Stats Error:", error)
        return NextResponse.json({
            visitorsNow: 0,
            sessions: 0,
            totalSales: 0,
            totalOrders: 0,
            activeCarts: 0,
            checkingOut: 0,
            purchased: 0,
            visitorDetails: [],
        })
    }
}
