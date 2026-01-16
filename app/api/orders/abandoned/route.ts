import { NextResponse } from "next/server"
import { drizzle } from "drizzle-orm/d1"
import { orders } from "@/db/schema"
import { eq } from "drizzle-orm"

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const { paymentIntentId, email, amount, items, name } = await req.json()

        if (!paymentIntentId || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const db = drizzle(process.env.DB as D1Database)

        // Check if order exists
        const existingOrder = await db.select().from(orders).where(eq(orders.stripePaymentIntentId, paymentIntentId)).get()

        if (existingOrder) {
            // Only update if not paid
            if (existingOrder.status !== "paid") {
                await db.update(orders)
                    .set({
                        customerEmail: email,
                        status: "abandoned",
                        metadata: JSON.stringify(items)
                    })
                    .where(eq(orders.stripePaymentIntentId, paymentIntentId))
                    .run()
            }
        } else {
            // Create new abandoned order
            await db.insert(orders).values({
                id: crypto.randomUUID(),
                stripePaymentIntentId: paymentIntentId,
                amount: Math.round(amount * 100),
                status: "abandoned",
                customerEmail: email,
                metadata: JSON.stringify(items),
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Abandoned Order API Error:", error)
        return NextResponse.json({ error: "Failed to capture abandoned order" }, { status: 500 })
    }
}
