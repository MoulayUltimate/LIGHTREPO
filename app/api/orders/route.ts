import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { auth } from "@/auth"

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const { paymentIntentId, amount, items, email, name } = await req.json()

        if (!paymentIntentId || !amount || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // const db = drizzle(process.env.DB as D1Database)

        await db.insert(orders).values({
            id: crypto.randomUUID(),
            stripePaymentIntentId: paymentIntentId,
            amount: Math.round(amount * 100),
            status: "pending",
            metadata: JSON.stringify(items),
            customerEmail: email,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Create Order Error:", error)
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        // const session = await auth()
        // if (!session?.user) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        // }

        // const db = drizzle(process.env.DB as D1Database)
        const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).all()

        return NextResponse.json(allOrders)
    } catch (error) {
        console.error("Orders API Error:", error)
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const { paymentIntentId, email, name } = await req.json()

        if (!paymentIntentId || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // const db = drizzle(process.env.DB as D1Database)

        // Update the order with customer details
        await db.update(orders)
            .set({
                customerEmail: email,
                // We could store name in metadata if we want, or add a column. 
                // For now, let's update metadata to include name
                // But updating JSON in SQLite is tricky without parsing first.
                // Let's just assume we only update email for now as per schema.
            })
            .where(eq(orders.stripePaymentIntentId, paymentIntentId))
            .run()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Update Order Error:", error)
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }
}
