import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "edge";

export async function GET() {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        const results = {
            hasToken: !!token,
            hasChatId: !!chatId,
            tokenStart: token ? token.substring(0, 5) + "..." : "missing",
            chatId: chatId ? "present" : "missing"
        };

        if (!token || !chatId) {
            return NextResponse.json({
                success: false,
                error: "Missing credentials",
                debug: results
            }, { status: 500 });
        }

        await sendTelegramMessage(`🛠️ <b>Debug Test</b>\n\nChecking Telegram integration.`);

        return NextResponse.json({
            success: true,
            message: "Sent test message",
            debug: results
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: String(error)
        }, { status: 500 });
    }
}
