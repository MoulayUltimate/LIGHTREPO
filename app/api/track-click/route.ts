import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { externalClicks } from "@/db/schema";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { linkUrl, location } = body;

        if (!linkUrl || !location) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const message = `🚀 <b>Initiated Checkout</b>\n\n🔗 <b>Link:</b> ${linkUrl}\n📍 <b>Location:</b> ${location}`;

        // Run concurrently, but don't let DB failure stop the response or notification logging
        const [dbResult, telegramResult] = await Promise.allSettled([
            db.insert(externalClicks).values({
                linkUrl,
                location,
            }),
            sendTelegramMessage(message)
        ]);

        if (dbResult.status === 'rejected') {
            console.error("Tracking DB Error:", dbResult.reason);
        }

        if (telegramResult.status === 'rejected') {
            console.error("Telegram Error:", telegramResult.reason);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking click:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
