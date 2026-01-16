import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY is missing")
            return new NextResponse("Internal Server Error", { status: 500 })
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2025-01-27.acacia",
        })

        const { amount } = await req.json()

        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error("[PAYMENT_INTENT_ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
