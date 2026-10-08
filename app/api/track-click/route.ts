import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { externalClicks } from "@/db/schema";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { linkUrl, location, visitorId, kind } = body;

        // Add-to-cart presses share this endpoint but are stored under a
        // "cart:" prefix so checkout-click figures never include them.
        const isAddToCart = kind === "add_to_cart";
        const storedLocation = isAddToCart ? `cart:${location}` : location;
        const storedUrl = isAddToCart ? "(add-to-cart)" : linkUrl;

        if (!location || (!isAddToCart && !linkUrl)) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const message = `🚀 <b>Initiated Checkout</b>\n\n🔗 <b>Link:</b> ${linkUrl}\n📍 <b>Location:</b> ${location}`;

        // Run concurrently, but don't let DB failure stop the response or notification logging
        const [dbResult, telegramResult] = await Promise.allSettled([
            db.insert(externalClicks).values({
                linkUrl: storedUrl,
                location: storedLocation,
                visitorId: typeof visitorId === "string" ? visitorId : null,
            }),
            isAddToCart ? Promise.resolve() : sendTelegramMessage(message)
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
