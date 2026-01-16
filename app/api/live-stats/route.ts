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

        // 1. Visitors right now (unique visitors in last 10 min)
        try {
            const recentPageViews = await db
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
        const checkingOut = recentOrders.filter(o => o.status === 'pending').length
        const purchased = recentOrders.filter(o => o.status === 'paid').length
        const totalSales = recentOrders
            .filter(o => o.status === 'paid')
            .reduce((sum, o) => sum + (o.amount || 0), 0) / 100 // Convert from cents

        const totalOrders = recentOrders.length

        return NextResponse.json({
            visitorsNow: uniqueVisitors,
            sessions: sessions,
            totalSales: totalSales,
            totalOrders: totalOrders,
            activeCarts: activeCarts,
            checkingOut: checkingOut,
            purchased: purchased,
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
        })
    }
}
