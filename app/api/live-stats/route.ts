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

        // 1. Visitors right now (unique visitors in last 10 min)
        const recentPageViews = await db
            .select({ visitorId: pageViews.visitorId })
            .from(pageViews)
            .where(sql`${pageViews.createdAt} > ${tenMinutesAgoTimestamp}`)
            .all()

        const uniqueVisitors = new Set(recentPageViews.map(pv => pv.visitorId).filter(Boolean)).size

        // 2. Sessions (total page views in last 10 min)
        const sessionsResult = await db
            .select({ count: count() })
            .from(pageViews)
            .where(sql`${pageViews.createdAt} > ${tenMinutesAgoTimestamp}`)
            .get()

        const sessions = sessionsResult?.count || 0

        // 3. Active carts (visitors on /checkout page in last 10 min)
        const activeCartsResult = await db
            .select({ visitorId: pageViews.visitorId })
            .from(pageViews)
            .where(sql`${pageViews.path} = '/checkout' AND ${pageViews.createdAt} > ${tenMinutesAgoTimestamp}`)
            .all()

        const activeCarts = new Set(activeCartsResult.map(pv => pv.visitorId).filter(Boolean)).size

        // 4. Orders in last 10 min
        const recentOrders = await db
            .select()
            .from(orders)
            .where(sql`${orders.createdAt} > ${tenMinutesAgoTimestamp}`)
            .all()

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
        return NextResponse.json({ error: "Failed to fetch live stats" }, { status: 500 })
    }
}
