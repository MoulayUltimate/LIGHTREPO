import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders } from "@/db/schema"
import { sendTelegramMessage } from "@/lib/telegram"

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const { email, amount, items, name } = await req.json()

        if (!email || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // const db = drizzle(process.env.DB as D1Database)

        // Generate unique order ID
        const orderId = crypto.randomUUID()

        // Create abandoned checkout record
        await db.insert(orders).values({
            id: orderId,
            stripePaymentIntentId: null, // No payment intent for payment link flow
            amount: Math.round(amount * 100), // Store in cents
            status: "abandoned",
            customerEmail: email,
            metadata: JSON.stringify({ items, name }),
        })

        // Format items for Telegram message
        const itemsList = items.map((item: any) => {
            return `  • ${item.quantity}x ${item.product.name}`
        }).join('\n')

        // Send Telegram notification
        await sendTelegramMessage(
            `🛒 <b>Abandoned Checkout</b>\n\n` +
            `👤 Customer: ${name}\n` +
            `📧 Email: ${email}\n` +
            `💰 Amount: $${(amount).toFixed(2)}\n\n` +
            `📦 Items:\n${itemsList}\n\n` +
            `🆔 Order ID: ${orderId}`
        )

        return NextResponse.json({ success: true, orderId })
    } catch (error) {
        console.error("Abandoned Order API Error:", error)
        return NextResponse.json({ error: "Failed to capture abandoned order" }, { status: 500 })
    }
}
