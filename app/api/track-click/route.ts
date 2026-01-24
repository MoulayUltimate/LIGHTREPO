import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { externalClicks } from "@/db/schema";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { linkUrl, location } = body;

        if (!linkUrl || !location) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Track in DB
        await db.insert(externalClicks).values({
            linkUrl,
            location,
        });

        // Send Telegram notification
        // Using a more robust message format
        const message = `🚀 <b>Initiated Checkout</b>\n\n🔗 <b>Link:</b> ${linkUrl}\n📍 <b>Location:</b> ${location}`;

        // Fire and forget telegram message to not block response too much, 
        // though await is safer for serverless functions to ensure execution.
        await sendTelegramMessage(message);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking click:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
