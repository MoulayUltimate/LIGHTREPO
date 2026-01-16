import { NextResponse } from "next/server"
import { drizzle } from "drizzle-orm/d1"
import { visitors, pageViews, orders } from "@/db/schema"
import { sql, count, sum } from "drizzle-orm"

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
                .select({ visitorId: pageViews.visitorId })
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
            .reduce((sum, o) => sum + (o.amount || 0), 0) / 100 // Convert from cents

        const totalOrders = recentOrders.filter(o => o.status !== 'abandoned').length

        // Checking out = live visitors on /checkout page (real-time tracking)
        const checkingOut = activeCarts

        // Active carts = people who abandoned (entered email but didn't complete)
        const abandonedCarts = recentOrders.filter(o => o.status === 'abandoned').length
        const totalActiveCarts = abandonedCarts

        // 6. Get top countries from recent visitors
        let topCountries: { country: string; count: number }[] = []
        try {
            const recentVisitorIds = new Set(recentPageViews.map(pv => pv.visitorId).filter(Boolean))
            if (recentVisitorIds.size > 0) {
                const recentVisitors = await db
                    .select()
                    .from(visitors)
                    .where(sql`${visitors.id} IN (${Array.from(recentVisitorIds).map(id => `'${id}'`).join(',')})`)
                    .all()

                const countryMap = new Map<string, number>()
                recentVisitors.forEach(v => {
                    const country = v.country || 'Unknown'
                    countryMap.set(country, (countryMap.get(country) || 0) + 1)
                })

                topCountries = Array.from(countryMap.entries())
                    .map(([country, count]) => ({ country, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5)
            }
        } catch (e) {
            console.error("Error fetching countries:", e)
        }

        return NextResponse.json({
            visitorsNow: uniqueVisitors,
            sessions: sessions,
            totalSales: totalSales,
            totalOrders: totalOrders,
            activeCarts: totalActiveCarts,
            checkingOut: checkingOut,
            purchased: purchased,
            topCountries: topCountries,
        })
    } catch (error) {
        console.error("Live Stats Error:", error)
        // Return zeros instead of error to prevent frontend crash
        return NextResponse.json({
            visitorsNow: 0,
            sessions: 0,
            totalSales: 0,
            totalOrders: 0,
            activeCarts: 0,
            checkingOut: 0,
            purchased: 0,
            topCountries: [],
        })
    }
}
