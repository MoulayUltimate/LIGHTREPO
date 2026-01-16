import { NextResponse } from "next/server"
import { drizzle } from "drizzle-orm/d1"
import { visitors, pageViews } from "@/db/schema"
import { UAParser } from "ua-parser-js"
import { eq } from "drizzle-orm"

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const { path, referrer, visitorId: clientVisitorId } = await req.json()

        // In Cloudflare Pages, we access the DB from the request context
        // But since we are using Drizzle, we need to get the binding.
        // In Next.js on Cloudflare, bindings are usually available on process.env
        // or passed via context. For now, we'll try process.env.DB
        const db = drizzle(process.env.DB as D1Database)

        const userAgent = req.headers.get("user-agent") || ""
        const parser = new UAParser(userAgent)
        const device = parser.getDevice()
        const os = parser.getOS()
        const browser = parser.getBrowser()

        // Geo data from Cloudflare headers
        const country = req.headers.get("cf-ipcountry") || "Unknown"
        const city = req.headers.get("cf-ipcity") || "Unknown"

        // Simple IP hash (in a real app, use a proper hashing with salt)
        // For now, we rely on the client-generated visitorId for session tracking
        // and just store the IP hash if available or skip it.

        let visitorId = clientVisitorId

        // Check if visitor exists
        const existingVisitor = await db.select().from(visitors).where(eq(visitors.id, visitorId)).get()

        if (!existingVisitor) {
            // Create new visitor
            await db.insert(visitors).values({
                id: visitorId,
                userAgent: userAgent,
                deviceType: device.type || "desktop",
                country: country,
                city: city,
            })
        }

        // Record page view
        await db.insert(pageViews).values({
            visitorId: visitorId,
            path: path,
            referrer: referrer || null,
            duration: 0, // Duration tracking would require a separate "ping" or "exit" event
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Analytics Error:", error)
        return NextResponse.json({ error: "Failed to track" }, { status: 500 })
    }
}
