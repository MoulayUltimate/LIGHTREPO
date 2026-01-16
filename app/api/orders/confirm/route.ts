import { NextResponse } from "next/server"
import Stripe from "stripe"
import { drizzle } from "drizzle-orm/d1"
import { orders } from "@/db/schema"
import { eq } from "drizzle-orm"

export const runtime = 'edge'

export async function POST(req: Request) {
    try {
        const { paymentIntentId } = await req.json()

        if (!paymentIntentId) {
            return NextResponse.json({ error: "Missing paymentIntentId" }, { status: 400 })
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY is missing")
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2025-02-24.acacia",
        })

        // Verify payment status with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        if (paymentIntent.status !== "succeeded") {
            return NextResponse.json({ error: "Payment not successful" }, { status: 400 })
        }

        const db = drizzle(process.env.DB as D1Database)

        // Update order status to paid
        await db.update(orders)
            .set({
                status: "paid",
            })
            .where(eq(orders.stripePaymentIntentId, paymentIntentId))
            .run()

        return NextResponse.json({
            success: true,
            amount: paymentIntent.amount / 100, // Convert back to main unit
            currency: paymentIntent.currency.toUpperCase()
        })
    } catch (error) {
        console.error("Confirm Order Error:", error)
        return NextResponse.json({ error: "Failed to confirm order" }, { status: 500 })
    }
}
