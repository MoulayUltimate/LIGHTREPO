import { NextResponse } from "next/server"
import Stripe from "stripe"
import { drizzle } from "drizzle-orm/d1"
import { orders } from "@/db/schema"

export const runtime = 'edge'
// Trigger redeploy for env vars

export async function POST(req: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY is missing")
            return new NextResponse("Internal Server Error", { status: 500 })
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2025-02-24.acacia",
        })

        const { amount, items, currency } = await req.json()

        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency || "usd",
            description: "Lightburn Pro Guide Service",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                items: JSON.stringify(items)
            }
        })

        // Create order in DB - REMOVED to prevent pending orders on page load
        // We will create the order when the user submits the form instead.
        /*
        try {
            const db = drizzle(process.env.DB as D1Database)
            await db.insert(orders).values({
                id: crypto.randomUUID(),
                stripePaymentIntentId: paymentIntent.id,
                amount: Math.round(amount * 100),
                status: "pending",
                metadata: JSON.stringify(items),
            })
        } catch (dbError) {
            console.error("Failed to create order in DB:", dbError)
        }
        */

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error("[PAYMENT_INTENT_ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
